import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { User, UsersApiService } from '../users-api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersApiService: UsersApiService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id') as string;
    this.usersApiService
      .getUser(userId)
      .subscribe((user) => (this.user = user));
  }
}
