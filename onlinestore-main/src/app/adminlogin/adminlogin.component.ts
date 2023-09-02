import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAuthService } from '../adminauth.service'; // Import your admin authentication service
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminAuthService: AdminAuthService,
    private router: Router
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

      this.adminAuthService.authenticateAdmin(username, password).subscribe(
        (authenticated) => {
          if (authenticated) {
            alert('Admin login successful'); // Show alert message
            this.router.navigate(['/admin/admindashboard']);
            // Handle navigation to admin dashboard here
          } else {
            alert('Admin login failed'); // Show alert message
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
