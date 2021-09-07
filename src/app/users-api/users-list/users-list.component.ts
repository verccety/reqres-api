import {
  UsersApiService,
  UsersApiResponse,
  User,
} from './../users-api.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  users!: User[];
  faTrash = faTrashAlt;


  constructor(private usersApiService: UsersApiService) {
    this.usersApiService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(id: string) {
    this.users = this.users.filter((user) => id !== user.id);
    this.usersApiService.deleteUser(id).subscribe();
  }
}
