import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhyPatientVisitsComponent } from './phy-patient-visits.component';

describe('PhyPatientVisitsComponent', () => {
  let component: PhyPatientVisitsComponent;
  let fixture: ComponentFixture<PhyPatientVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhyPatientVisitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhyPatientVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
