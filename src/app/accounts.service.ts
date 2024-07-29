/**import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Account } from './account';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private _registerUrl = "/api/register"
  private _loginUrl = "/api/login"
  constructor(private _http: HttpClient, private _router: Router) { }

  registerUser(user: Account){
    return this._http.post<any>(this._registerUrl, user)
  }

  loginUser(user: Account){
    return this._http.post<any>(this._loginUrl, user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  //new 2/2/2023
  getId(){
    return localStorage.getItem('currId')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/'])
  }
}**/

import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Account } from './account';
import { Meal } from './meal';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private _registerUrl = "/api/register"
  private _loginUrl = "/api/login"
  private _addUrl = "/api/add"
  private _getUrl = "/api/getCart"
  private _yeetUrl = "/api/deleteCart"
  private _adminUrl = "/api/admin"
  private _yoink = "/api/deleteAll"
  private _getUser = "/api/accounts/:id"

  private _stripe = "/cart"

  constructor(private _http: HttpClient, private _router: Router) { }

  viewAccountDetails() : Observable <Object[]>{
    let user = localStorage.getItem('currId') || '';
    console.log("user id in viewAccountDetails: ", user)
    return this._http.get<Object[]>(this._getUser.replace(':id',user))
  }

  updateAccount(tmp: any) : Observable <Object[]>
  {
    let user = localStorage.getItem('currId') || '';
    console.log("user id in updateAccount: ", user);
    return this._http.put<Object[]>(this._getUser.replace(':id',user), tmp);
  }
  makePayment(stripeToken: any): Observable<any>{
    //const url = "http://localhost:5000/checkout/"
 
    return this._http.post<any>(this._stripe,{token:stripeToken})
  }

  /**viewCart()
  {
    let user = localStorage.getItem('currId') || '';
    return this._http.get(this._getUrl, {responseType: 'json'})
  }**/
  viewCart() : Observable <Object[]>{
    let user = localStorage.getItem('currId') || '';
    console.log("user id in view cart acc serv: ", user)
    return this._http.get<Object[]>(this._getUrl, {params: {user: user}})
  }

  

  admin(){
    let user = localStorage.getItem('currId') || '';
    if(user === '63e304d43bfcce4786b61c50' || user === '63f3fe347b32642d7f8efb4d'){
      return true;
    }else{
      return false;
    }
  }
  /*
  deleteMeal(food: any): Observable <Object[]>
  {
    let data = {
      item: food,
      user: localStorage.getItem('currId')
    }
    return this._http.put<Object[]>(this._yeetUrl + data);
  } */

  deleteMeal(food: any): Observable<Object[]> {
    let data = {
      item: food,
      user: localStorage.getItem('currId')
    }
    return this._http.put<Object[]>(this._yeetUrl, {params: data});
  }

  deleteAll(): Observable<Object[]> {
    let data = {
      user: localStorage.getItem('currId')
    }
    return this._http.put<Object[]>(this._yoink, {params: data});
  }

  
  addCart(food: any){
     let data = {
      item: food,
      user: localStorage.getItem('currId')
    }
    return this._http.put<any>(this._addUrl, data)
  }

  registerUser(user: Account){
    return this._http.post<any>(this._registerUrl, user)
  }

  loginUser(user: Account){
    return this._http.post<any>(this._loginUrl, user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  //new 2/2/2023
  getId(){
    return localStorage.getItem('currId')
  }

  logoutUser(){
    localStorage.removeItem('token')
    localStorage.removeItem('currId')
    this._router.navigate(['/'])
  }
}