import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UserManagementComponent implements OnInit {
  addUserForm: FormGroup;
  userList: any[] = [];
  selectedUser: any;
  editUserForm: FormGroup;
  showAddUserForm = false;



  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
      this.editUserForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    
      this.addUserForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  ngOnInit(): void {
    this.refreshUserList();
  }

  onAddUserSubmit() {
    if (this.addUserForm.valid) {
      const newUser = {
        username: this.addUserForm.value.username,
        password: this.addUserForm.value.password
      };

      this.userService.addUser(newUser).subscribe(
        (response) => {
          console.log('User added successfully:', response);
          alert('useradded successfully');
          this.refreshUserList();
        },
        (error) => {
          console.error('User addition error:', error);
        }
      );
    }
  }

  onEditUser(user: any) {
    // Set the selectedUser and populate the editUserForm
    console.log('Edit button clicked for user:', user);
    this.selectedUser = user;
    this.editUserForm.setValue({
      username: user.username,
      password: user.password
    });
  }

  onSaveEdit() {
    // Update the selected user's details from the editUserForm
    this.selectedUser.username = this.editUserForm.value.username;
    this.selectedUser.password = this.editUserForm.value.password;

    // Call the editUser method from the UserService
    this.userService.editUser(this.selectedUser).subscribe(
      (response) => {
        alert('User details updated successfully');
        this.selectedUser = null; // Reset selectedUser
        this.editUserForm.reset(); // Reset the form
        this.refreshUserList();
      },
      (error) => {
        alert('Error updating user details');
        console.error('User update error:', error);
      }
    );
  }

  onDeleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        (response: any) => {
          alert('User deleted successfully');
          this.refreshUserList();
        },
        (error: any) => {
          alert('Error deleting user');
          console.error('User deletion error:', error);
        }
      );
    }
  }
  
  refreshUserList() {
    this.userService.getUserData().subscribe(
      (users) => {
        this.userList = users;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
