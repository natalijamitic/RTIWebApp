import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubjectEmployeeLectureComponent } from './display-subject-employee-lecture.component';

describe('DisplaySubjectEmployeeLectureComponent', () => {
  let component: DisplaySubjectEmployeeLectureComponent;
  let fixture: ComponentFixture<DisplaySubjectEmployeeLectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubjectEmployeeLectureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubjectEmployeeLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
