import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureBillingComponent } from './departure-billing.component';

describe('DepartureBillingComponent', () => {
  let component: DepartureBillingComponent;
  let fixture: ComponentFixture<DepartureBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartureBillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartureBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
