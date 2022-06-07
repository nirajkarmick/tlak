import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureSidebarComponent } from './departure-sidebar.component';

describe('DepartureSidebarComponent', () => {
  let component: DepartureSidebarComponent;
  let fixture: ComponentFixture<DepartureSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartureSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartureSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
