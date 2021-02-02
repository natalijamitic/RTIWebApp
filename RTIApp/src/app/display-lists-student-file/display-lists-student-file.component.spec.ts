import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayListsStudentFileComponent } from './display-lists-student-file.component';

describe('DisplayListsStudentFileComponent', () => {
  let component: DisplayListsStudentFileComponent;
  let fixture: ComponentFixture<DisplayListsStudentFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayListsStudentFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayListsStudentFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
