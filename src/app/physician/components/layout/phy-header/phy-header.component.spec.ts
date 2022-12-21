import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhyHeaderComponent } from './phy-header.component';

describe('PhyHeaderComponent', () => {
  let component: PhyHeaderComponent;
  let fixture: ComponentFixture<PhyHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhyHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
