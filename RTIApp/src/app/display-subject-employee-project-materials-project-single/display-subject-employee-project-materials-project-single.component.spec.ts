import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubjectEmployeeProjectMaterialsProjectSingleComponent } from './display-subject-employee-project-materials-project-single.component';

describe('DisplaySubjectEmployeeProjectMaterialsProjectSingleComponent', () => {
  let component: DisplaySubjectEmployeeProjectMaterialsProjectSingleComponent;
  let fixture: ComponentFixture<DisplaySubjectEmployeeProjectMaterialsProjectSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubjectEmployeeProjectMaterialsProjectSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubjectEmployeeProjectMaterialsProjectSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
