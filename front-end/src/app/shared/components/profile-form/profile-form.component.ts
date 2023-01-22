import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import User from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageUtils } from 'src/app/utils/localStorage';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css'],
})
export class ProfileFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private localStorageUtils: LocalStorageUtils
  ) {}

  @Input() user: User | undefined;
  profileForm: any;

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user?.name],
      email: [this.user?.email],
      isSeller: [
        {
          value: this.user?.isSeller ?? true,
          disabled: this.user?.isSeller ?? true,
        },
      ],
    });
  }

  editUser(): void {
    this.userService.getUsers.subscribe((users) => {
      let userFound: any = JSON.parse(
        JSON.stringify(
          users.find(
            (user) => user.id == parseInt(this.localStorageUtils.getUserId())
          )
        )
      );

      userFound.name = this.profileForm.value.name;
      userFound.isSeller =
        this.profileForm.value.isSeller ?? this.user?.isSeller;

      this.userService.editUser(userFound).subscribe({
        next: () => {
          window.location.reload();
        },
      });
    });
  }
}
