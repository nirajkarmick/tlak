import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureSettingsComponent } from './departure-settings.component';

describe('DepartureSettingsComponent', () => {
  let component: DepartureSettingsComponent;
  let fixture: ComponentFixture<DepartureSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartureSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartureSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
