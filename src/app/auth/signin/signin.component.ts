import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { LoadingService } from '../../loading.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  faUser = faUser;
  faSpinner = faSpinner;
  loading$ = this.loader.loading$;
  authForm = this.fb.group({
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
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public loader: LoadingService
  ) {}

  getFieldControl(name: string) {
    return this.authForm.get(name) as FormControl;
  }

  onSubmit() {
    if (!this.authForm.valid) return;

    this.authService.signin(this.authForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/users');
      },
      error: () => {
        this.authForm.setErrors({ credentials: true });
      },
    });
  }
}
