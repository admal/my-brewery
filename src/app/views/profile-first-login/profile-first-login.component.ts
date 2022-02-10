import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService, RegisterProfileResult } from 'src/app/services/profiles/profile.service';

@Component({
  selector: 'mb-profile-first-login',
  templateUrl: './profile-first-login.component.html',
  styleUrls: ['./profile-first-login.component.scss']
})
export class ProfileFirstLoginComponent implements OnInit {
  newUserForm: FormGroup;
  email: string = "dupa@wp.pl";
  saveClick$ = new Subject<void>();
  saveResult$: Observable<RegisterProfileResult>;

  constructor(
    private auth: AuthService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.email = this.auth.user.email;

    this.newUserForm = this.fb.group({
      firstName: this.fb.control("", [Validators.maxLength(64)]),
      lastName: this.fb.control("", [Validators.maxLength(64)])
      // avatar - TODO: add avatar support
    });

    this.saveResult$ = this.saveClick$.pipe(
      filter(_ => this.newUserForm.valid),
      switchMap(_ => {
        let registerModel = {
          id: this.auth.user.id,
          email: this.auth.user.email,
          ...this.newUserForm.value
        };

        return this.profileService.registerProfile(registerModel);
      }),
      tap(result => {
        if (result.success) {
          this.router.navigate(["beer"]);
        }
      })
    )
  }

  get lastName() {
    return this.newUserForm.get("lastName");
  }

  get firstName() {
    return this.newUserForm.get("firstName");
  }

  save() {
    this.saveClick$.next();
  }
}
