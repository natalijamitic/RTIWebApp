import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubjectEmployeeLabMaterialsLabSingleComponent } from './display-subject-employee-lab-materials-lab-single.component';

describe('DisplaySubjectEmployeeLabMaterialsLabSingleComponent', () => {
  let component: DisplaySubjectEmployeeLabMaterialsLabSingleComponent;
  let fixture: ComponentFixture<DisplaySubjectEmployeeLabMaterialsLabSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubjectEmployeeLabMaterialsLabSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubjectEmployeeLabMaterialsLabSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
