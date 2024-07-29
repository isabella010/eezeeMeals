import { Component, OnInit } from '@angular/core';
import { Meal } from '../meal';
import { MealService } from '../meal.service';
import { FormsModule, FormControl, }   from '@angular/forms';
import { AccountsService } from '../accounts.service';


@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css'],
  providers: [MealService]
})
export class MealComponent implements OnInit {
  
  meals :Array<Meal>;
  mealFormControl = new FormControl('');
  upFormControl = new FormControl('');


  constructor(private _mealService: MealService, public _accService: AccountsService) { }

  ngOnInit(): void 
  {
    console.log("IN ngOnInit")
     this._mealService.getMeals().subscribe(resMealData => this.meals = resMealData);
     
  }

  onSubmitAddMeal(meal: Meal)
  {
    console.log("IN SUBMITMEAL")
    this._mealService.addMeal(meal).subscribe(resNewMeal =>this.meals.push(resNewMeal));
  }

  
  onSubmitDeleteMeal()
  {
    console.log("IN DELETE")
    console.log("meal form control value : ", this.mealFormControl.value);
    let mealForDelete = this.meals.find(meal => meal.name.toLowerCase() == this.mealFormControl.value.toLowerCase())
      console.log(" MealForDelete: ",mealForDelete);
      if(!mealForDelete)
      {
        return;
      }
       
    this._mealService.deleteMeal(mealForDelete).subscribe(res => {
      if(!res)  return;

      let idx = this.meals.indexOf(res)
      this.meals.splice(idx, 1);
    });
  }    

  onSubmitUpdateMeal()
  {
    console.log("IN Update")
    console.log("meal form control value : ", this.upFormControl.value);
    let mealForUp = this.meals.find(meal => meal.name.toLowerCase() == this.upFormControl.value.toLowerCase())
      console.log(" MealForUp: ",mealForUp);
      if(!mealForUp)
      {
        return;
      }
       
    this._mealService.upMeal(mealForUp).subscribe(res => {
      if(!res)  return;

      let idx = this.meals.indexOf(res)
      this.meals.splice(idx, 1);
    });
  } 
}


