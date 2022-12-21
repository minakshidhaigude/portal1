import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { globalVariables } from '../../../../global-variables';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: any = {};
  success: boolean = false;
  from: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.from = params['from'];
    });
    this.registerForm = this.formBuilder.group({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(globalVariables.emailPattern),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password2: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      dob: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      role: new FormControl('', [Validators.required]),
      speciality: new FormControl('', []),
    });
  }
  registerSubmit() {
    if (this.registerForm.valid && this.validate()) {
      this.registerForm.value.reg_date = new Date();
      this.registerForm.value.active = false;
      if (this.registerForm.value.role != 'physician')
        delete this.registerForm.value.speciality;
      this.authService.createUser(this.registerForm.value).subscribe(
        (res) => {
          console.log(JSON.stringify(res));
          console.log(this.from);
          if (this.from == 'admin') {
            this.router.navigateByUrl('/admin');
          } else {
            this.success = true;
          }
        },
        (err) => {
          console.log(JSON.stringify(err));
          this.errors = err;
        }
      );
    } else {
      if (this.registerForm.get('fname').hasError('required')) {
        this.errors.error = 'first name required';
      } else if (this.registerForm.get('lname').hasError('required')) {
        this.errors.error = 'last name required';
      } else if (this.registerForm.get('email').hasError('required')) {
        this.errors.error = 'email id required';
      } else if (this.registerForm.get('email').hasError('pattern')) {
        this.errors.error = 'email id is invalid';
      } else if (this.registerForm.get('dob').hasError('required')) {
        this.errors.error = 'dob required';
      } else if (this.registerForm.get('mobile').hasError('required')) {
        this.errors.error = 'mobile number required';
      } else if (this.registerForm.get('mobile').hasError('pattern')) {
        this.errors.error = 'mobile number is invalid';
      } else if (this.registerForm.get('role').hasError('required')) {
        this.errors.error = 'Select a role';
      } else if (this.registerForm.get('password').hasError('required')) {
        this.errors.error = 'password required';
      } else if (this.registerForm.get('password').hasError('minlength')) {
        this.errors.error = 'password is too short';
      } else if (this.registerForm.get('password2').hasError('required')) {
        this.errors.error = 'password2 required';
      } else if (this.registerForm.get('password2').hasError('minlength')) {
        this.errors.error = 'password2 is too short';
      }
    }
  }

  validate(): boolean {
    this.errors = {};
    if (this.registerForm.value.password != this.registerForm.value.password2) {
      this.errors.error = 'Passwords does not match';
      return false;
    } else {
      delete this.registerForm.value.password2;
      return true;
    }
  }
}
