import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayListsStudentComponent } from './display-lists-student.component';

describe('DisplayListsStudentComponent', () => {
  let component: DisplayListsStudentComponent;
  let fixture: ComponentFixture<DisplayListsStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayListsStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayListsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
