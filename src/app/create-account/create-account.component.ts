import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'blue-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  accountForm: FormGroup;
  view = 'email';
  inputType = 'password';
  action = 'Show';
  numberFlag = false;
  uppercaseFlag = false;
  specialCharFlag = false;
  specialPassword = '@!#$%^&*()+~./[]{}';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.accountForm = this.formBuilder.group({
      mobileNumber: ['', Validators.required],
      emailAddress: '',
      password: ['', Validators.required],
      accept: ['', Validators.required]
    });
  }

  toggleView() {
    if (this.view === 'mobile') {
      this.view = 'email';
    } else {
      this.view = 'mobile';
    }
  }

  togglePasswordView() {
    if (this.inputType === 'password') {
      this.inputType = 'text';
      this.action = 'Hide';
    } else {
      this.inputType = 'password';
      this.action = 'Show';
    }
  }

  validatePassword() {
    console.log(this.accountForm.controls['password'].value);
    const password = this.accountForm.controls['password'].value;

    this.numberFlag = false;
    this.uppercaseFlag = false;
    this.specialCharFlag = false;

    for (let i = 0; i < password.length; i++) {
      if (password.charAt(i) >= '0' && password.charAt(i) <= '9') {
        this.numberFlag = true;
      }
      if (password.charAt(i) >= 'A' && password.charAt(i) <= 'Z') {
        this.uppercaseFlag = true;
      }
      if (this.specialPassword.match(password.charAt(i))) {
        this.specialCharFlag = true;
      }
      if (this.numberFlag === true && this.uppercaseFlag === true && this.specialCharFlag === true) {
        break;
      }
    }
  }

  onSubmit() {
    console.log('Success');
    this.router.navigate(['/success']);
  }
}
