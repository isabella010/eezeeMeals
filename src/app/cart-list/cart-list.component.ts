import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
  inputs: ['meals'],
})
export class CartListComponent implements OnInit {
  meals: any[];
  

  constructor(private _acc: AccountsService) { }

  ngOnInit(): void { console.log("i dotn know anymore: ", this.meals); }
}