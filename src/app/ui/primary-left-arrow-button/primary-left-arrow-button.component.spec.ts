import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryLeftArrowButtonComponent } from './primary-left-arrow-button.component';

describe('PrimaryLeftArrowButtonComponent', () => {
  let component: PrimaryLeftArrowButtonComponent;
  let fixture: ComponentFixture<PrimaryLeftArrowButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryLeftArrowButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryLeftArrowButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
