import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubjectStudentExerciseComponent } from './display-subject-student-exercise.component';

describe('DisplaySubjectStudentExerciseComponent', () => {
  let component: DisplaySubjectStudentExerciseComponent;
  let fixture: ComponentFixture<DisplaySubjectStudentExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubjectStudentExerciseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubjectStudentExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
