import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureItineraryComponent } from './departure-itinerary.component';

describe('DepartureItineraryComponent', () => {
  let component: DepartureItineraryComponent;
  let fixture: ComponentFixture<DepartureItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartureItineraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartureItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
