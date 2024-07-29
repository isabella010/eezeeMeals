import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar'
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MealsComponent } from './meals/meals.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GiftCardsComponent } from './gift-cards/gift-cards.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { FooterComponent } from './footer/footer.component';
import { PopularMealsComponent } from './popular-meals/popular-meals.component';

import {IvyCarouselModule} from 'angular-responsive-carousel';
import { MealComponent } from './meal/meal.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealDetailComponent } from './meal-detail/meal-detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { AccountsService } from './accounts.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { CartComponent } from './cart/cart.component';
import { ReactiveFormsModule }   from '@angular/forms';
import { CartListComponent } from './cart-list/cart-list.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { PaymentComponent } from './payment/payment.component';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MealsComponent,
    HomeComponent,
    NotFoundComponent,
    GiftCardsComponent,
    AboutUsComponent,
    HomeBannerComponent,
    FooterComponent,
    PopularMealsComponent,
    MealComponent,
    MealListComponent,
    MealDetailComponent,
    SignInComponent,
    SignInPageComponent,
    SignUpComponent,
    SignUpPageComponent,
    CartComponent,
    CartListComponent,
    EditAccountComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    IvyCarouselModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
    //NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AccountsService, AuthGuard, 
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
