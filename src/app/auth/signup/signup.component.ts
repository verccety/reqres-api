import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { LoadingService } from '../../loading.service';
import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  faUser = faUser;
  faSpinner = faSpinner;
  loading$ = this.loader.loading$;


  authForm = this.fb.group(
    {
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern(/^\S+@\S+$/),
        ],
      ],
      password: [''],
      passwordConfirmation: [''],
    },
    {
      validators: this.matchPassword.validate,
    }
  );
  constructor(
    private fb: FormBuilder,
    private matchPassword: MatchPassword,
    private authService: AuthService,
    private router: Router,
    public loader: LoadingService

  ) {}

  getFieldControl(name: string) {
    return this.authForm.get(name) as FormControl;
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    this.authService.signup(this.authForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/users');
      },
      error: (err) => {
        if (!err.status) {
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      },
    });
  }
}
