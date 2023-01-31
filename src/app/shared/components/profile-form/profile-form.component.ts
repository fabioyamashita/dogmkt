import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    private localStorageUtils: LocalStorageUtils,
    private toastr: ToastrService
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
          // window.location.reload();

          let toast = this.toastr.success(
            'User edited successfully!',
            'Edit User',
            { timeOut: 2000 }
          );
        },

        error: (err) => {
          this.toastr.error('An error has occurred!', 'Ops...', {
            timeOut: 2000,
          });
        },
      });
    });
  }
}
