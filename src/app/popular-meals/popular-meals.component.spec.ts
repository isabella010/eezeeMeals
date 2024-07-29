import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularMealsComponent } from './popular-meals.component';

describe('PopularMealsComponent', () => {
  let component: PopularMealsComponent;
  let fixture: ComponentFixture<PopularMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularMealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
