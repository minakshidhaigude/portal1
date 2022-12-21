import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmMainContentComponent } from './adm-main-content.component';

describe('AdmMainContentComponent', () => {
  let component: AdmMainContentComponent;
  let fixture: ComponentFixture<AdmMainContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmMainContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
