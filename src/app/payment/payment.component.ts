import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(){ }
  handler:any = null;
  ngOnInit() {
    //this.loadStripe();
  }

}