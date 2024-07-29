/**import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealsComponent } from './meals/meals.component';
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { AboutUsComponent } from './about-us/about-us.component';
import { GiftCardsComponent } from './gift-cards/gift-cards.component';
import { AppComponent } from './app.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'meals', component:MealsComponent,
   canActivate: [AuthGuard]
  },
  {path: 'gift-cards', component:GiftCardsComponent},
  {path: 'about-us', component:AboutUsComponent},
  {path: 'signin', component:SignInPageComponent},
  {path: 'signup', component:SignUpPageComponent},
  {path: 'cart', component:CartComponent},
  {path: '', component:HomeComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }**/


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealsComponent } from './meals/meals.component';
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { AboutUsComponent } from './about-us/about-us.component';
import { GiftCardsComponent } from './gift-cards/gift-cards.component';
import { AppComponent } from './app.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { PaymentComponent } from './payment/payment.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './auth.guard';
import { EditAccountComponent } from './edit-account/edit-account.component';

const routes: Routes = [
  {path: 'meals', component:MealsComponent,
   canActivate: [AuthGuard]
  },
  {path: 'gift-cards', component:GiftCardsComponent},
  {path: 'about-us', component:AboutUsComponent},
  {path: 'signin', component:SignInPageComponent},
  {path: 'pay', component:PaymentComponent,
    canActivate: [AuthGuard]
  },
  {path: 'signup', component:SignUpPageComponent},
  {path: 'edit-account', component:EditAccountComponent},
  {path: 'cart', component:CartComponent,
    canActivate: [AuthGuard]
  },
  {path: '', component:HomeComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }