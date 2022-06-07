import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingTourComponent } from './upcoming-tour.component';

describe('UpcomingTourComponent', () => {
  let component: UpcomingTourComponent;
  let fixture: ComponentFixture<UpcomingTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
