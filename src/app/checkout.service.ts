import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
 
  constructor(private http: HttpClient) { }
  
  makePayment(stripeToken: any): Observable<any>{
    const url = "http://localhost:5000/checkout/"
 
    return this.http.post<any>(url,{token:stripeToken})
  }
}