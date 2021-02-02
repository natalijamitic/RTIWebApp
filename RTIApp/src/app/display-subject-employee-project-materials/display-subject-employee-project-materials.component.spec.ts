import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubjectEmployeeProjectMaterialsComponent } from './display-subject-employee-project-materials.component';

describe('DisplaySubjectEmployeeProjectMaterialsComponent', () => {
  let component: DisplaySubjectEmployeeProjectMaterialsComponent;
  let fixture: ComponentFixture<DisplaySubjectEmployeeProjectMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubjectEmployeeProjectMaterialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySubjectEmployeeProjectMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
