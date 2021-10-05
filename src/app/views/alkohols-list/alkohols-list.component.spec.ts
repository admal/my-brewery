import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlkoholsListComponent } from './alkohols-list.component';

describe('AlkoholsListComponent', () => {
  let component: AlkoholsListComponent;
  let fixture: ComponentFixture<AlkoholsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlkoholsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlkoholsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
