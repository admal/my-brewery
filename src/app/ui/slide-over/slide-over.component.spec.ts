import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideOverComponent } from './slide-over.component';

describe('SlideOverComponent', () => {
  let component: SlideOverComponent;
  let fixture: ComponentFixture<SlideOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideOverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
