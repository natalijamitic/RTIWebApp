import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubjectEmployeeExamMaterialsComponent } from './display-subject-employee-exam-materials.component';

describe('DisplaySubjectEmployeeExamMaterialsComponent', () => {
  let component: DisplaySubjectEmployeeExamMaterialsComponent;
  let fixture: ComponentFixture<DisplaySubjectEmployeeExamMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubjectEmployeeExamMaterialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubjectEmployeeExamMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
