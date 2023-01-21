import { Component, Input, OnInit } from '@angular/core';
import { Store } from 'src/app/app.store';
import User from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageUtils } from 'src/app/utils/localStorage';

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private store: Store,
    private localStorageUtils: LocalStorageUtils
  ) {}

  user: User | undefined;

  ngOnInit(): void {
    this.store
      .getUser$()
      .subscribe({
        next: (users) =>
          (this.user = users.find(
            (user) => user.id == parseInt(this.localStorageUtils.getUserId())
          )),
      });
  }
}
