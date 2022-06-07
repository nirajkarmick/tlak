import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureLocationComponent } from './departure-location.component';

describe('DepartureLocationComponent', () => {
  let component: DepartureLocationComponent;
  let fixture: ComponentFixture<DepartureLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartureLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartureLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
