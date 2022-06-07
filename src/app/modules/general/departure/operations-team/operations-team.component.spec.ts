import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsTeamComponent } from './operations-team.component';

describe('OperationsTeamComponent', () => {
  let component: OperationsTeamComponent;
  let fixture: ComponentFixture<OperationsTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
