import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Meal } from './meal';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MealService {

  private _getUrl = "/api/meals";
  private _postUrl = "/api/meals";
  private _putUrl = "/api/meals/"; //for update
  private _deleteUrl = "/api/meals/";

  private _upUrl = "/api/updateM/";

  private _upUrlFALSE = "/api/updateFALSE/";
  private _upUrlTRUE = "/api/updateTRUE/";


  constructor(private _http: HttpClient) { }

  getMeals(): Observable<Meal[]>
  {
    return this._http.get<Meal[]>(this._getUrl);
  }

  addMeal(meal: Meal): Observable<Meal>
  {
    return this._http.post<Meal>(this._postUrl, meal); /////////comeback to for description
  }

  deleteMeal(meal: Meal): Observable<Meal>
  {
    return this._http.delete<Meal>(this._deleteUrl + meal._id);
  }

  updateMeal(meal: Meal): Observable<Meal>
  {
    return this._http.post<Meal>(this._putUrl + meal._id, meal); //implement next sprint
  }


  upMeal(meal: Meal): Observable<Meal>{  
    //let data = {
    //  m: meal
    //}
    return this._http.put<Meal>(this._upUrl + meal._id, meal);
  }

  

  upMealFalse(meal: Meal): Observable<Meal>{  

    return this._http.put<Meal>(this._upUrlFALSE + meal._id, meal);
  }


  upMealTrue(meal: Meal): Observable<Meal>{  

    return this._http.put<Meal>(this._upUrlTRUE + meal._id, meal);
  }
  
}