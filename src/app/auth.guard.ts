import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AccountsService } from './accounts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _accService: AccountsService,
    private _router: Router) {}


  canActivate(): boolean{
    if(this._accService.loggedIn()){
      return true;
    } else{
      this._router.navigate(['/signin'])
      return false
    }
  }
}
