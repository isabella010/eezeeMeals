import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AccountsService } from './accounts.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req: any, next: any){
    let accService = this.injector.get(AccountsService)
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer xx.yy.zz ${accService.getToken()}`
      }
    })
    return next.handle(tokenizedReq) 
  }
}
