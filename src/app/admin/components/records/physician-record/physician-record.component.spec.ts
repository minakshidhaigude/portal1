import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianRecordComponent } from './physician-record.component';

describe('PhysicianRecordComponent', () => {
  let component: PhysicianRecordComponent;
  let fixture: ComponentFixture<PhysicianRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicianRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicianRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
