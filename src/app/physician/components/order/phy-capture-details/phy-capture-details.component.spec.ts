import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhyCaptureDetailsComponent } from './phy-capture-details.component';

describe('PhyCaptureDetailsComponent', () => {
  let component: PhyCaptureDetailsComponent;
  let fixture: ComponentFixture<PhyCaptureDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhyCaptureDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhyCaptureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
