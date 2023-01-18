import { Component, Input, OnInit } from '@angular/core';
import { Store } from 'src/app/app.store';
import User from 'src/app/models/user';
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
  user!: any;

  ngOnInit(): void {
    this.user = this.store.value.users.find(
      (user) => user.id == parseInt(this.localStorageUtils.getUserId())
    );
  }
}
