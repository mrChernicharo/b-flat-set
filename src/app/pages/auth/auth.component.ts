import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
/**
 * @title Basic expansion panel
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  panelOpenState = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })
    this.signupForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })
  }


  handleLogin() {
    // console.log(this.loginForm.value)
    // const email = this.loginForm.value['email']
    // const password = this.loginForm.value['password']
    // this.authService.login(email, password)


  }

  handleSignUp() {
    // console.log(this.signupForm.value);

    // const username = this.loginForm.value['username']
    // const email = this.signupForm.get('email').value
    // const password = this.signupForm.get('password').value
    const email = this.signupForm.value['email']
    const password = this.signupForm.value['password']
    console.log(email)
    console.log(password)

    this.authService.signUp(email, password).subscribe(responseData => {
      console.log(responseData)
    }, error => {
      console.log(error)
    })
    this.signupForm.reset()

  }

}
