import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersApiService } from '../users-api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  user!: User;
  editMode = false;
  userForm = this.fb.group({
    firstName: [{ value: '', disabled: !this.editMode }],
    lastName: [{ value: '', disabled: !this.editMode }],
    email: [
      { value: '', disabled: !this.editMode },
      [Validators.pattern(/^\S+@\S+$/)],
    ],
  });

  constructor(
    private route: ActivatedRoute,
    private usersApiService: UsersApiService,
    private fb: FormBuilder
  ) {
    this.user = this.route.snapshot.data.user;

    this.route.data.subscribe(({ user }) => {
      this.user = user;
      this.userForm.setValue({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      });
    });
  }

  getFieldControl(name: string) {
    return this.userForm.get(name) as FormControl;
  }

  toggleForm() {
    this.editMode = !this.editMode;
    this.editMode ? this.userForm.enable() : this.userForm.disable();
  }
  onSubmit(id: string) {
    if (!this.userForm.valid) return;
    this.toggleForm();
    this.usersApiService.editUser(id, this.userForm.value).subscribe({
      error: () => {
        this.userForm.setErrors({ unknownError: true });
      },
    });
  }
}
