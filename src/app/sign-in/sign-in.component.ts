import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { Router } from '@angular/router';
import { setA, a } from 'global';
 
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  loginUserData: any = {} 
  constructor(private _acc: AccountsService,
    private _router: Router){}
 
  ngOnInit(){}
 
  loginUser(){
    this._acc.loginUser(this.loginUserData)
      .subscribe(
        res=> {
          console.log(res)
          localStorage.setItem('token', res.data.token) //localStorage.setItem('token', res.token) // 2/2/2023
          localStorage.setItem('currId', res.data.currId) // 2/2/2023
          setA(res.data.currId);
          console.log(res.data.currId);
          console.log(a);
          this._router.navigate(['/meals'])
        },
        err => console.log(err)
      )
  }
}


