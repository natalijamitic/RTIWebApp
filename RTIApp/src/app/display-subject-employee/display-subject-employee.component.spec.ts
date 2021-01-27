import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubjectEmployeeComponent } from './display-subject-employee.component';

describe('DisplaySubjectEmployeeComponent', () => {
  let component: DisplaySubjectEmployeeComponent;
  let fixture: ComponentFixture<DisplaySubjectEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubjectEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubjectEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
