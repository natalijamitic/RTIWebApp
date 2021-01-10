import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubjectNotificationsComponent } from './display-subject-notifications.component';

describe('DisplaySubjectNotificationsComponent', () => {
  let component: DisplaySubjectNotificationsComponent;
  let fixture: ComponentFixture<DisplaySubjectNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubjectNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubjectNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
