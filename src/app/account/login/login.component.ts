import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageUtils } from 'src/app/utils/localStorage';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageUtils: LocalStorageUtils,
    private routesService: RoutesService,
    private toastr: ToastrService
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
        next: (res) => {
          this.localStorageUtils.saveDataFromResponse(res);

          let toast = this.toastr.success(
            'Login Successful!',
            'Welcome to DOGMKT!',
            { timeOut: 2000 }
          );

          if (toast) {
            toast.onShown.subscribe(() =>
              this.routesService.navigateToCollection()
            );
          }
        },
        error: (err) => {
          this.errorMsg = 'Wrong email/password';

          this.toastr.error('An error has occurred!', 'Ops...', {
            timeOut: 2000,
          });
        },
      });
  }
}
