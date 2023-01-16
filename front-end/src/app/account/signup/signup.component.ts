import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from 'src/app/app.store';
import User from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private store: Store
  ) {}

  signupForm: any;
  errorMsg: string = '';

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [],
      email: [],
      password: [],
      isSeller: [],
    });
  }

  onSubmitForm(): void {
    let user: User = new User();
    user = Object.assign({}, user, this.signupForm.value);

    this.userService.createUser(user).subscribe({
      next: () => this.router.navigate(['/account/login']),
      error: (err) => {
        this.errorMsg = err.error;
      },
    });
  }
}
