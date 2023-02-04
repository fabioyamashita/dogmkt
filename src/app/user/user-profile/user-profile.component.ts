import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from 'src/app/app.store';
import Purchase from 'src/app/models/purchase';
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
    private localStorageUtils: LocalStorageUtils,
    private activatedRoute: ActivatedRoute
  ) {}

  user: User | undefined;
  purchases: Purchase[] | undefined;

  ngOnInit(): void {
    this.store.getUser$().subscribe({
      next: (users) =>
        (this.user = users.find(
          (user) => user.id == parseInt(this.localStorageUtils.getUserId())
        )),
    });

    this.activatedRoute.data.subscribe(
      ({ purchases }) => (this.purchases = purchases)
    );
  }
}
