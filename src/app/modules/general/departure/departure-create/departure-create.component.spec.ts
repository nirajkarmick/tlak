import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureCreateComponent } from './departure-create.component';

describe('DepartureCreateComponent', () => {
  let component: DepartureCreateComponent;
  let fixture: ComponentFixture<DepartureCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartureCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartureCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
