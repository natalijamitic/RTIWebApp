import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubjectStudentExamMaterialsComponent } from './display-subject-student-exam-materials.component';

describe('DisplaySubjectStudentExamMaterialsComponent', () => {
  let component: DisplaySubjectStudentExamMaterialsComponent;
  let fixture: ComponentFixture<DisplaySubjectStudentExamMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubjectStudentExamMaterialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubjectStudentExamMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
