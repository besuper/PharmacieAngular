import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewprescriptionComponent } from './newprescription.component';

describe('NewprescriptionComponent', () => {
  let component: NewprescriptionComponent;
  let fixture: ComponentFixture<NewprescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewprescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewprescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
