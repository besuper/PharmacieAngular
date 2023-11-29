import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprescriptionComponent } from './editprescription.component';

describe('EditprescriptionComponent', () => {
  let component: EditprescriptionComponent;
  let fixture: ComponentFixture<EditprescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditprescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditprescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
