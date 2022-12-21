import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMainContentComponent } from './patient-main-content.component';

describe('PatientMainContentComponent', () => {
  let component: PatientMainContentComponent;
  let fixture: ComponentFixture<PatientMainContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMainContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
