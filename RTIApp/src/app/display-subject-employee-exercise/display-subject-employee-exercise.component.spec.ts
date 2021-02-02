import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubjectEmployeeExerciseComponent } from './display-subject-employee-exercise.component';

describe('DisplaySubjectEmployeeExerciseComponent', () => {
  let component: DisplaySubjectEmployeeExerciseComponent;
  let fixture: ComponentFixture<DisplaySubjectEmployeeExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubjectEmployeeExerciseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubjectEmployeeExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
