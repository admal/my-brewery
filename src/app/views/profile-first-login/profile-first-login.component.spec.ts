import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFirstLoginComponent } from './profile-first-login.component';

describe('ProfileFirstLoginComponent', () => {
  let component: ProfileFirstLoginComponent;
  let fixture: ComponentFixture<ProfileFirstLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFirstLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFirstLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
