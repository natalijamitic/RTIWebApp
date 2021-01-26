import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubjectStudentLectureComponent } from './display-subject-student-lecture.component';

describe('DisplaySubjectStudentLectureComponent', () => {
  let component: DisplaySubjectStudentLectureComponent;
  let fixture: ComponentFixture<DisplaySubjectStudentLectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubjectStudentLectureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubjectStudentLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
