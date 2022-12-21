import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePhysicianComponent } from './manage-physician.component';

describe('ManagePhysicianComponent', () => {
  let component: ManagePhysicianComponent;
  let fixture: ComponentFixture<ManagePhysicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePhysicianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePhysicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
