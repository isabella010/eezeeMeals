/* import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { Meal } from '../meal';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [AccountsService]
})
export class CartComponent implements OnInit{
  meals : any;
  constructor(private _acc: AccountsService){}
  ngOnInit(): void 
  {
    console.log("IN ngOnInit cart")
     this._acc.viewCart().subscribe(resCartData => this.meals = resCartData);
     console.log("hte mealz:", this.meals)
  }
} */

/*
import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { Meal } from '../meal';
import { of } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [AccountsService]
})
export class CartComponent implements OnInit{
  meals : any;
  constructor(private _acc: AccountsService){}
  async ngOnInit(): Promise<void> 
  {
    console.log("IN ngOnInit cart");
    this.meals = await this._acc.viewCart().toPromise();
    console.log("hte mealz:", this.meals);
  }
} */

import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { Meal } from '../meal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [AccountsService]
})
export class CartComponent implements OnInit{
  meals : any;
  tmp : any;
  total: Number;
  payy: number;
  tmpAcc: any;
  oneTimeAccount: any;
  oneTimeAcc: any;
  showForm = false;
  showAddress = false;
  formDisabled = false; 
  formLocked = false;
  confirmClicked = false;
  postalRegex = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;
  confirmationMessage = ''; 

  paymentHandler: any = null;
  success: boolean = false
  failure:boolean = false
  title="eezee Mealz"

  constructor(private _acc: AccountsService){}

  handler:any = null;

  ngOnInit(): void 
  {
    this.total = 0;
    console.log("IN ngOnInit cart")
    this._acc.viewCart().subscribe(resCartData => {
      this.tmp = resCartData;
      console.log("hte mealz:", this.tmp)
      this.meals = this.tmp.cart;
      this._acc.viewAccountDetails().subscribe(resCartData => {
        this.tmpAcc = resCartData;
        console.log("Current Account:", this.tmpAcc);
        
    });
    this._acc.viewAccountDetails().subscribe(resCartData => {
      this.oneTimeAcc = resCartData;
      this.oneTimeAcc.street ="";
      this.oneTimeAcc.number = "";
      this.oneTimeAcc.unit = "";
      this.oneTimeAcc.postal ="";
      this.oneTimeAcc.city = "";
      this.oneTimeAcc.phone = "";
      console.log("OneTimeAccount:", this.oneTimeAcc);
      
  });
    });

    //new
    this.loadStripe();
  }

  confirmDetails() 
  {
    if (!this.oneTimeAcc.street || !this.oneTimeAcc.number || !this.oneTimeAcc.city || !this.oneTimeAcc.postal || !this.oneTimeAcc.phone) {
      alert('Please fill in all required fields');
      return;
    }
    
    else if (!/^[a-zA-Z\s]+$/.test(this.oneTimeAcc.street) || !/\S/.test(this.oneTimeAcc.street)) {
      alert('Please enter a valid street name (letters only)');
      return;
    }
    else if (!/^\d+$/.test(this.oneTimeAcc.number)) {
      alert('Please enter a valid address number');
      return;
    }

    else if (!/^[a-zA-Z\s]+$/.test(this.oneTimeAcc.city) || !/\S/.test(this.oneTimeAcc.city)) {
      alert('Please enter a valid city name (letters only)');
      return;
    }

    else if (!(this.postalRegex.test(this.oneTimeAcc.postal))) {
      alert('Please enter a valid postal code');
      return;
    }

    else if (!/^\d{10}$/.test(this.oneTimeAcc.phone)) {
      alert('Please enter a valid phone number');
      return;
    }
    this.confirmClicked = true;
  }
  editDetails() {
    this.confirmClicked = false;
  }
  

  makePayment(amount: number) 
  {
    if (!this.tmpAcc.street && !this.confirmClicked) {
      alert('Please fill out shipping information');
      return;
    }
    else if(this.showForm && !this.confirmClicked || !this.showForm && !this.tmpAcc.street)
    {
      alert('Please confirm a shipping method')
      return;
    }
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MovXCAkvyUBOBQoyMDcPPXWzpoEgVvBQl9RrjuY1GYaB5bs9fzFM5M9wAUJlU75oISIbR8Zrv4yrb83K27ryecL00VNDnz9F9',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentstripe(stripeToken);
      },
    });
 
    const paymentstripe = (stripeToken: any) => {
      this._acc.makePayment(stripeToken).subscribe((data: any) => {
        console.log(data);
        if (data.data === "success") {
          this.success = true

          this.out();
        }
        else {
          this.failure = true
          alert('Payment Failed');
        }
      });
    };
 
    paymentHandler.open({
      name: 'eezee Mealz',
      description: '',
      amount: amount * 100,
    });
  }
 
  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MovXCAkvyUBOBQoyMDcPPXWzpoEgVvBQl9RrjuY1GYaB5bs9fzFM5M9wAUJlU75oISIbR8Zrv4yrb83K27ryecL00VNDnz9F9',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };
 
      window.document.body.appendChild(script);
    }
  }

  delItm(itm: any){
    console.log("itm in question: ", itm)
    this._acc.deleteMeal(itm)
      .subscribe(
        res=> {
          console.log(res)
          location.reload(); // Reload page
        },
        err => console.log(err)
      )
  }

  out(){
    this._acc.deleteAll()
      .subscribe(
        res=> {
          console.log(res);
          //alert('You have successfully checked out!');
          location.reload(); // Reload page
        },
        err => console.log(err)
      )
  }

  addItem(itm: any){
    console.log("this is the meal obj in the cart: ", itm)
    this._acc.addCart(itm)
      .subscribe(
        res=> {
          console.log(res)
          location.reload(); // Reload page
        },
        err => console.log(err)
      )
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (let meal of this.meals) {
      totalPrice += meal.price * meal.quantity;
    }
    return totalPrice.toFixed(2);
  }

  getTotalPriceTax() {
    let t = 0;
    for (let meal of this.meals) {
      t += meal.price * meal.quantity;
    }
    t = t * 1.13;
    this.payy = t;
    localStorage.setItem('price', t.toFixed(2)) // 2/2/2023
    return t.toFixed(2);
    
    //return t;
  }
}