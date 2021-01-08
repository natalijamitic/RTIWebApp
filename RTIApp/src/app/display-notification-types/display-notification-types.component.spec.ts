import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNotificationTypesComponent } from './display-notification-types.component';

describe('DisplayNotificationTypesComponent', () => {
  let component: DisplayNotificationTypesComponent;
  let fixture: ComponentFixture<DisplayNotificationTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayNotificationTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayNotificationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
