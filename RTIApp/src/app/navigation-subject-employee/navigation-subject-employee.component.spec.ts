import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationSubjectEmployeeComponent } from './navigation-subject-employee.component';

describe('NavigationSubjectEmployeeComponent', () => {
  let component: NavigationSubjectEmployeeComponent;
  let fixture: ComponentFixture<NavigationSubjectEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationSubjectEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationSubjectEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
