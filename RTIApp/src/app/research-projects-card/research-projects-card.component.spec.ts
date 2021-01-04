import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchProjectsCardComponent } from './research-projects-card.component';

describe('ResearchProjectsCardComponent', () => {
  let component: ResearchProjectsCardComponent;
  let fixture: ComponentFixture<ResearchProjectsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchProjectsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchProjectsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
