import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { globalVariables } from '../../../../global-variables';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  email = '';
  errors: any = {};
  success: boolean = false;
  fpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fpForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(globalVariables.emailPattern),
      ]),
    });
  }
  emailSubmit() {
    if (this.fpForm.valid)
      this.authService.sendEmail(this.fpForm.value).subscribe(
        (res) => {
          console.log(JSON.stringify(res));
          this.success = true;
        },
        (err) => {
          console.log(JSON.stringify(err));
          this.errors = err;
        }
      );
    else {
      if (this.fpForm.get('email').hasError('required')) {
        this.errors.error = 'email id required';
      } else if (this.fpForm.get('email').hasError('pattern')) {
        this.errors.error = 'email id is invalid';
      }
    }
  }
}
