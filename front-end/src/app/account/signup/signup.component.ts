import { NavigationUtils } from './../../utils/navigationUtils';
import { CheckoutService } from './../../services/checkout.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import User from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Cart from 'src/app/models/cart';

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
    private checkoutService: CheckoutService,
    private navigationUtils: NavigationUtils
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
        this.checkoutService.createCart(new Cart(response.user.id)).subscribe();
        this.navigationUtils.navigateToLogin();
      },
      error: (err) => {
        this.errorMsg = err.error;
      },
    });
  }
}
