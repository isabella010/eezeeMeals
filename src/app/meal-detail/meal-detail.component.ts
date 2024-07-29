import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.css'],
  inputs: ['meal']
})
export class MealDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
