import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhyPatientDetailsComponent } from './phy-patient-details.component';

describe('PhyPatientDetailsComponent', () => {
  let component: PhyPatientDetailsComponent;
  let fixture: ComponentFixture<PhyPatientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhyPatientDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhyPatientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
