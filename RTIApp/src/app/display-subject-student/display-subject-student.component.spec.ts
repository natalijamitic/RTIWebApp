import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubjectStudentComponent } from './display-subject-student.component';

describe('DisplaySubjectStudentComponent', () => {
  let component: DisplaySubjectStudentComponent;
  let fixture: ComponentFixture<DisplaySubjectStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubjectStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubjectStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
