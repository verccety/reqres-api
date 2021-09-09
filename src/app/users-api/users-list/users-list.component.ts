import { Component } from '@angular/core';
import { faSpinner, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { LoadingService } from '../../loading.service';
import {
  Resourse, User, UsersApiService
} from './../users-api.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  users!: User[];
  resourses!: Resourse[];
  loading$ = this.loader.loading$;

  faTrash = faTrashAlt;
  faSpinner = faSpinner;

  constructor(
    private usersApiService: UsersApiService,
    public loader: LoadingService
  ) {
    this.usersApiService.getUsers().subscribe((users) => {
      this.users = users;
    });
    this.usersApiService.getResources().subscribe((resourses) => {
      this.resourses = resourses;
    });
  }

  deleteUser(id: string) {
    this.usersApiService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter((user) => id !== user.id);
    });
  }
}
