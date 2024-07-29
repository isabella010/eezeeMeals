import { Component, OnInit, EventEmitter } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { MealService } from '../meal.service';
import { FormsModule, FormControl, }   from '@angular/forms';
import { Meal } from '../meal';

@Component({
  selector: 'meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css'],
  inputs: ['meals'],
  outputs: ['SelectMeal'],
  providers: [MealService]
})
export class MealListComponent implements OnInit {
   meals: any[];
   mealId: any;

   mealsList :Array<Meal>;
   mealFormControl = new FormControl('');
   upFormControl = new FormControl('');
  // public SelectMeal = new EventEmitter();
  constructor(private _mealService: MealService, public _accService: AccountsService) { }

  ngOnInit(): void {
  console.log("IN ngOnInit")
  this._mealService.getMeals().subscribe(resMealData => this.mealsList = resMealData); 
}
  
  onSubmitDeleteMeal(meal: Meal)
  {
    console.log("IN DELETE")
    console.log("meal form control value : ", this.mealFormControl.value);
    let mealForDelete = meal;
      console.log(" MealForDelete: ",mealForDelete);
      if(!mealForDelete)
      {
        return;
      }
       
    this._mealService.deleteMeal(mealForDelete).subscribe(res => {
      if(!res)  return;

      let idx = this.mealsList.indexOf(res)
      this.mealsList.splice(idx, 1);
    });
    location.reload();
  }    

  onSubmitUpdateMealFalse(meal: Meal)
  {
    
    console.log("IN Update")
    console.log("meal form control value : ", this.upFormControl.value);
    let mealForUp = meal;
      console.log(" MealForUp: ",mealForUp);
      if(!mealForUp)
      {
        return;
      }
       
    this._mealService.upMealFalse(mealForUp).subscribe(res => {
      if(!res)  return;

      let idx = this.mealsList.indexOf(res)
      this.mealsList.splice(idx, 1);
    });
    location.reload();
  } 

  onSubmitUpdateMealTrue(meal: Meal)
  {
    console.log("IN Update")
    console.log("meal form control value : ", this.upFormControl.value);
    let mealForUp = meal;
      console.log(" MealForUp: ",mealForUp);
      if(!mealForUp)
      {
        return;
      }
       
    this._mealService.upMealTrue(mealForUp).subscribe(res => {
      if(!res)  return;

      let idx = this.mealsList.indexOf(res)
      this.mealsList.splice(idx, 1);
    });
    location.reload();
  } 
  addItem(itm: any){
    console.log("this is the meal obj: ", itm)
    this._accService.addCart(itm)
      .subscribe(
        res=> {
          console.log(res)
          //localStorage.setItem('token', res.data.token) //localStorage.setItem('token', res.token) // 2/2/2023
          //localStorage.setItem('currId', res.data.currId) // 2/2/2023
          //this._router.navigate(['/meals'])
        },
        err => console.log(err)
      )
  }

}

