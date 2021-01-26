import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubjectStudentNotificationsComponent } from './display-subject-student-notifications.component';

describe('DisplaySubjectStudentNotificationsComponent', () => {
  let component: DisplaySubjectStudentNotificationsComponent;
  let fixture: ComponentFixture<DisplaySubjectStudentNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubjectStudentNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubjectStudentNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
