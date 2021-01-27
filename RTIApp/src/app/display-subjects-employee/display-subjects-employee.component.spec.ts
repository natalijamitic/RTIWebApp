import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubjectsEmployeeComponent } from './display-subjects-employee.component';

describe('DisplaySubjectsEmployeeComponent', () => {
  let component: DisplaySubjectsEmployeeComponent;
  let fixture: ComponentFixture<DisplaySubjectsEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubjectsEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubjectsEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
