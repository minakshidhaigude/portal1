import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PyDashboardComponent } from './py-dashboard.component';

describe('PyDashboardComponent', () => {
  let component: PyDashboardComponent;
  let fixture: ComponentFixture<PyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PyDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
