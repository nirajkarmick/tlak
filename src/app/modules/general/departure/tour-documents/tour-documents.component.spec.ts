import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourDocumentsComponent } from './tour-documents.component';

describe('TourDocumentsComponent', () => {
  let component: TourDocumentsComponent;
  let fixture: ComponentFixture<TourDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
