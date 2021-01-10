import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorRoutePageComponent } from './error-route-page.component';

describe('ErrorRoutePageComponent', () => {
  let component: ErrorRoutePageComponent;
  let fixture: ComponentFixture<ErrorRoutePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorRoutePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorRoutePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
