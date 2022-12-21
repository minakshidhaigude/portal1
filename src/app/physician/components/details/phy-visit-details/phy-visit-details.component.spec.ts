import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhyVisitDetailsComponent } from './phy-visit-details.component';

describe('PhyVisitDetailsComponent', () => {
  let component: PhyVisitDetailsComponent;
  let fixture: ComponentFixture<PhyVisitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhyVisitDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhyVisitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
