import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhyVisitHistoryComponent } from './phy-visit-history.component';

describe('PhyVisitHistoryComponent', () => {
  let component: PhyVisitHistoryComponent;
  let fixture: ComponentFixture<PhyVisitHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhyVisitHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhyVisitHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
