import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
//import { JwtHelperService } from '../../services/jwt-helper.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
   // private jwtHelper: JwtHelperService,
    private snackBar: MatSnackBar
  ) {}

  onLogin() {
    if (!this.email.trim()) {
      this.snackBar.open('Email is required!', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    if (!this.password.trim()) {
      this.snackBar.open('Password is required!', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);

          setTimeout(() => {
            let roleId = this.authService.getRoleId();

            if (roleId === '1') {
              this.router.navigate(['/dashboard']);
              console.log('Super Admin');
            } else if (roleId === '2') {
              this.router.navigate(['/dashboard']);
              console.log('Admin');
            } else if (roleId === '3') {
              this.router.navigate(['/dashboard']);
              console.log('Normal User');
            } else {
              console.error('Unknown RoleId:', roleId);
              alert('Invalid role.');
            }
          }, 100);
        } else {
          this.snackBar.open('Invalid Credentials!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      },
      error: (err) => {
        console.error('Login Error:', err);
        this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
