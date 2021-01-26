import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubjectStudentLabComponent } from './display-subject-student-lab.component';

describe('DisplaySubjectStudentLabComponent', () => {
  let component: DisplaySubjectStudentLabComponent;
  let fixture: ComponentFixture<DisplaySubjectStudentLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubjectStudentLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubjectStudentLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
