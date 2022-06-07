import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellersListComponent } from './travellers-list.component';

describe('TravellersListComponent', () => {
  let component: TravellersListComponent;
  let fixture: ComponentFixture<TravellersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravellersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
