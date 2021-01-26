import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubjectStudentInformationComponent } from './display-subject-student-information.component';

describe('DisplaySubjectStudentInformationComponent', () => {
  let component: DisplaySubjectStudentInformationComponent;
  let fixture: ComponentFixture<DisplaySubjectStudentInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubjectStudentInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubjectStudentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
