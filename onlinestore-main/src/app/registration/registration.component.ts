import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const newUser = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password
      };

      this.userService.register(newUser).subscribe(
        (response) => {
          // Display a success alert message
          alert('User registered successfully!');

          // After successful registration, navigate to the login page
          this.router.navigate(['/login']);
        },
        (error) => {
          // Display an error alert message
          alert('Registration error. Please try again.');

          console.error('Registration error:', error);
        }
      );
    }
  }
}
