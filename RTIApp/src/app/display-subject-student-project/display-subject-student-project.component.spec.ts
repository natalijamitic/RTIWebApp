import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubjectStudentProjectComponent } from './display-subject-student-project.component';

describe('DisplaySubjectStudentProjectComponent', () => {
  let component: DisplaySubjectStudentProjectComponent;
  let fixture: ComponentFixture<DisplaySubjectStudentProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubjectStudentProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubjectStudentProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
