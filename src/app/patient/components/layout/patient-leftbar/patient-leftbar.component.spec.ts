import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientLeftbarComponent } from './patient-leftbar.component';

describe('PatientLeftbarComponent', () => {
  let component: PatientLeftbarComponent;
  let fixture: ComponentFixture<PatientLeftbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientLeftbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientLeftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
