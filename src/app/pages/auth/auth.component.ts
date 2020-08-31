import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
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
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
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

    const email = this.loginForm.value['email']
    const password = this.loginForm.value['password']
    this.isLoading = true;

    console.log(email)
    console.log(password)

    this.authService.login(email, password).subscribe(responseData => {
      console.log(responseData)
      this.isLoading = false;
      this.loginForm.reset()
      this.router.navigate([''])
    }, error => {
      console.log(error)
      this.isLoading = false;
    })

  }

  handleSignUp() {

    const email = this.signupForm.value['email']
    const password = this.signupForm.value['password']
    this.isLoading = true;

    console.log(email)
    console.log(password)

    this.authService.signUp(email, password).subscribe(responseData => {
      console.log(responseData)
      this.isLoading = false;
    }, error => {
      console.log(error)
      this.isLoading = false;
    })
    this.signupForm.reset()

  }

}
