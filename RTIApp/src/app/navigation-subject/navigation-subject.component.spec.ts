import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationSubjectComponent } from './navigation-subject.component';

describe('NavigationSubjectComponent', () => {
  let component: NavigationSubjectComponent;
  let fixture: ComponentFixture<NavigationSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
