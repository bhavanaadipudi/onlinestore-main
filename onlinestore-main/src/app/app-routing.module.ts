import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { AdminLoginComponent } from './adminlogin/adminlogin.component';
import {AdmindashboardComponent  } from './admindashboard/admindashboard.component'
import { UserManagementComponent } from './usermanagement/usermanagement.component';
const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'admin/admindashboard', component: AdmindashboardComponent },
  { path: 'admin/usermanagement', component: UserManagementComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
