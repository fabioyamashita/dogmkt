import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any;

  ngOnInit(): void {
    this.user = {
      id: '1111',
      name: 'fabio',
      email: 'fabio@gmail.com',
      isSeller: false,
    };
  }
}
