import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { CheckoutService } from './../../services/checkout.service';
import { UserService } from 'src/app/services/user.service';
import { NavigationUtils } from './../../utils/navigationUtils';
import User from 'src/app/models/user';
import Cart from 'src/app/models/cart';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private checkoutService: CheckoutService,
    private navigationUtils: NavigationUtils,
    private toastr: ToastrService
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
      next: (response: any) => {
        this.checkoutService
          .createCart(new Cart(response.user.id))
          .subscribe(() => {
            let toast = this.toastr.success(
              'New account registered!',
              'Welcome!!',
              { timeOut: 1000 }
            );

            if (toast) {
              toast.onHidden.subscribe(() =>
                this.navigationUtils.navigateToLogin()
              );
            }
          });
      },

      error: (err) => {
        this.errorMsg = err.error;
        this.toastr.error('An error has occurred!', 'Ops...', {
          timeOut: 2000,
        });
      },
    });
  }
}
