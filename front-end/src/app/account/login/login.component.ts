import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageUtils } from 'src/app/utils/localStorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private localStorageUtils: LocalStorageUtils,
    private userService: UserService
  ) {}

  loginForm: any;
  errorMsg: string = '';

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [],
      password: [],
    });
  }

  onSubmitForm(): void {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (next) => {
          this.localStorageUtils.saveDataFromResponse(next);
          this.userService.getById(
            parseInt(this.localStorageUtils.getUserId())
          );
          this.router.navigate(['/collection/list']);
        },
        error: (err) => {
          this.errorMsg = 'Wrong email/password';
        },
      });
  }
}
