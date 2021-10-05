import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlkoholTimelineComponent } from './alkohol-timeline.component';

describe('AlkoholTimelineComponent', () => {
  let component: AlkoholTimelineComponent;
  let fixture: ComponentFixture<AlkoholTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlkoholTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlkoholTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
