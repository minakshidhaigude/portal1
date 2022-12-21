import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PRecordsComponent } from './p-records.component';

describe('PRecordsComponent', () => {
  let component: PRecordsComponent;
  let fixture: ComponentFixture<PRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
