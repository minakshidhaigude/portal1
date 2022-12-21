import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhyMainContentComponent } from './phy-main-content.component';

describe('PhyMainContentComponent', () => {
  let component: PhyMainContentComponent;
  let fixture: ComponentFixture<PhyMainContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhyMainContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhyMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
