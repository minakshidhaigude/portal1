import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import jwt_decode from 'jwt-decode';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { globalVariables } from '../../../../global-variables';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errors: any = {};
  decoded: any = {};
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(globalVariables.emailPattern),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  loginSubmit() {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe(
        (res) => {
          if (res.user.active == false) {
            this.errors.error = 'This account is in deactivated mode!';
            return;
          }
          this.authService.authToken = res.accessToken;
          localStorage.setItem('token', res.accessToken);
          this.decoded = jwt_decode(res.accessToken);
          localStorage.setItem('userDetails', JSON.stringify(this.decoded));
          localStorage.setItem('userDetails1', JSON.stringify(res.user));
          if (res.user.role == 'patient')
            this.router.navigate(['/patient/patient-dashboard']);
          else if (res.user.role == 'physician')
            this.router.navigate(['/physician/physician-dashboard']);
          else if (res.user.role == 'admin') this.router.navigate(['/admin']);
        },
        (err) => {
          console.log(JSON.stringify(err));
          this.errors = err;
          if (this.errors.error == 'Cannot find user')
            this.errors.error = 'Invalid credentials';
        }
      );
    } else {
      if (this.loginForm.get('email').hasError('required')) {
        this.errors.error = 'email id required';
      } else if (this.loginForm.get('email').hasError('pattern')) {
        this.errors.error = 'email id is invalid';
      } else if (this.loginForm.get('password').hasError('required')) {
        this.errors.error = 'password required';
      } else if (this.loginForm.get('password').hasError('minlength')) {
        this.errors.error = 'password is too short';
      }
    }
  }
}
