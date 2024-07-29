import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountsService } from '../accounts.service';
import { Router } from '@angular/router';
import { setA, a } from 'global';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  registerUserData: any = {} 

    first_name: String
    last_name: String
    email: String
    password: String
  constructor(private _acc: AccountsService,
              private _router: Router) { }

  ngOnInit(){
    
  }

  registerUser(){
    //console.log(this.first_name, this.last_name, this.email, this.password)
    //console.log(this.registerUserData)
    this._acc.registerUser(this.registerUserData)
      .subscribe(
        res=> {
          console.log(res)
          localStorage.setItem('token', res.data.token) //localStorage.setItem('token', res.token) // 2/2/2023
          localStorage.setItem('currId', res.data.currId) // 2/2/2023
          console.log(res.data.currId);
          console.log(a);
          this._router.navigate(['/meals'])
        },
        err => console.log(err)
      )
  } 

}