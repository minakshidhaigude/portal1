import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhyFooterComponent } from './phy-footer.component';

describe('PhyFooterComponent', () => {
  let component: PhyFooterComponent;
  let fixture: ComponentFixture<PhyFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhyFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhyFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
