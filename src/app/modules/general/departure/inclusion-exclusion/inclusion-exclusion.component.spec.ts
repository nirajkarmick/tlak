import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InclusionExclusionComponent } from './inclusion-exclusion.component';

describe('InclusionExclusionComponent', () => {
  let component: InclusionExclusionComponent;
  let fixture: ComponentFixture<InclusionExclusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InclusionExclusionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InclusionExclusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
