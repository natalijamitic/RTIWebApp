import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubjectEmployeeInformationComponent } from './display-subject-employee-information.component';

describe('DisplaySubjectEmployeeInformationComponent', () => {
  let component: DisplaySubjectEmployeeInformationComponent;
  let fixture: ComponentFixture<DisplaySubjectEmployeeInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubjectEmployeeInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubjectEmployeeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
