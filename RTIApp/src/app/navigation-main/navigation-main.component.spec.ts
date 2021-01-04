import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationMainComponent } from './navigation-main.component';

describe('Navigation.MainComponent', () => {
  let component: NavigationMainComponent;
  let fixture: ComponentFixture<NavigationMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
