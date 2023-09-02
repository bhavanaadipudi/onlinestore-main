import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.userService.checkIfUserExists(username).subscribe(
        (userExists) => {
          if (userExists) {
            this.userService.getUserByUsername(username).subscribe(
              (user) => {
                if (user.password === password) {
                  // Display login success message using alert
                  alert('Login successful');

                  // You can handle authentication here
                  // For example, set tokens, store user info, etc.
                  this.router.navigate(['/home']); // Navigate to home page
                } else {
                  // Display login failure message
                  alert('Invalid password');
                }
              },
              (error) => {
                console.error(error);
              }
            );
          } else {
            // Display login failure message
            alert('User not registered');
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
