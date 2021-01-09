import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNotificationsComponent } from './display-notifications.component';

describe('DisplayNotificationsComponent', () => {
  let component: DisplayNotificationsComponent;
  let fixture: ComponentFixture<DisplayNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
