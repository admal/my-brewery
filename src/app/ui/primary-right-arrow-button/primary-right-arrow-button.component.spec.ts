import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryRightArrowButtonComponent } from './primary-right-arrow-button.component';

describe('PrimaryRightArrowButtonComponent', () => {
  let component: PrimaryRightArrowButtonComponent;
  let fixture: ComponentFixture<PrimaryRightArrowButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryRightArrowButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryRightArrowButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
