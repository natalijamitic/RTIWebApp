import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubjectEmployeeLabMaterialsComponent } from './display-subject-employee-lab-materials.component';

describe('DisplaySubjectEmployeeLabMaterialsComponent', () => {
  let component: DisplaySubjectEmployeeLabMaterialsComponent;
  let fixture: ComponentFixture<DisplaySubjectEmployeeLabMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubjectEmployeeLabMaterialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubjectEmployeeLabMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
