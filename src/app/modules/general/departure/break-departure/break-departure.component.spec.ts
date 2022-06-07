import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakDepartureComponent } from './break-departure.component';

describe('BreakDepartureComponent', () => {
  let component: BreakDepartureComponent;
  let fixture: ComponentFixture<BreakDepartureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakDepartureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakDepartureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
