import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubjectNotificationsComponent } from './add-subject-notifications.component';

describe('AddSubjectNotificationsComponent', () => {
  let component: AddSubjectNotificationsComponent;
  let fixture: ComponentFixture<AddSubjectNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubjectNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubjectNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
