import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { AuthService, RegisterModel, RegisterResult } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profiles/profile.service';


@Component({
  selector: 'mb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  serverValidationErrors: {key: string};
  registerClick$ = new Subject<void>();
  registerResult$: Observable<RegisterResult>;

  constructor(
    private fb: FormBuilder,
    private profilesService: ProfileService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let passwordsGroup = this.fb.group({
      password: this.fb.control("", [Validators.required, Validators.minLength(6)]),
      repeatPassword: this.fb.control("", [Validators.required])
    }, {validators: this.confirmPasswordValidator});
    
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      passwords: passwordsGroup
    });

    this.registerResult$ = this.registerClick$
      .pipe(
        filter(_ => this.registerForm.valid),
        switchMap(_ => {
          let value = this.registerForm.value;
          console.log("registerModel", value);
          return this.auth.register({
            email: value.email,
            password: value.passwords.password
          });
        }),
        tap(result => {
          if (result.success) {
            this.router.navigate(["beer"])
          }
        })
      )
  }

  confirmPasswordValidator(control: FormGroup): ValidationErrors | null {
    let password = control.get("password").value;
    let repeatPassword = control.get("repeatPassword").value;

    return password == repeatPassword ? null : { passwordsMatch: { value: control.value } };
  }

  get passwords() {
    return this.registerForm.get("passwords");
  }

  get email() {
    return this.registerForm.get("email");
  }

  get password() {
    return this.registerForm.get("passwords").get("password");
  }

  get repeatPassword() {
    return this.registerForm.get("passwords").get("repeatPassword");
  }

  register() {
    console.log("passwords", this.passwords);
    this.registerClick$.next();
  }
}
