import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlkoholAddEditComponent } from './alkohol-add-edit.component';

describe('AlkoholAddEditComponent', () => {
  let component: AlkoholAddEditComponent;
  let fixture: ComponentFixture<AlkoholAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlkoholAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlkoholAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
