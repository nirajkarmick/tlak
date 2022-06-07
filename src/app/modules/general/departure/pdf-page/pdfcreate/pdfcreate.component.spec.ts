import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfcreateComponent } from './pdfcreate.component';

describe('PdfcreateComponent', () => {
  let component: PdfcreateComponent;
  let fixture: ComponentFixture<PdfcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfcreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
