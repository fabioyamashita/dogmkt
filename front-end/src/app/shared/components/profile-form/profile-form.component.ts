import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import User from 'src/app/models/user';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css'],
})
export class ProfileFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user?.name],
      email: [this.user?.email],
    });
  }

  @Input() user: User | undefined;
  profileForm: any;
}
