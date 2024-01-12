import { Inject, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);
  http = inject(HttpClient);
  baseUrl = environment.domain;

  username: any;
  isAuthenticated: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}
  checkAuth() {
    return this.http.get(this.baseUrl + '/api/auth/check', {
      withCredentials: true,
    });
  }
  signupAuth(formData: any) {
    return this.http
      .post(this.baseUrl + '/api/auth/signup', formData)
      .subscribe({
        next: (value) => {
          console.log(value);
          this.router.navigate(['/login']);
        },
        error: (error) => console.log(error),
      });
  }
  loginAuth(formData: any) {
    return this.http
      .post(this.baseUrl + '/api/auth/signin', formData, {
        withCredentials: true,
      })
      .subscribe({
        next: (value) => {
          console.log(value);
          console.log(Object.values(value)[1]);

          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('username', JSON.stringify(value));
          }
          this.router.navigate(['/']);
        },
        error: (error) => console.log(error),
      });
  }
  signOut() {
    return this.http
      .get(this.baseUrl + '/api/auth/signOut', {
        withCredentials: true,
      })
      .subscribe({
        next: (value) => {
          console.log(value);
          localStorage.removeItem('username');

          const currentRoute = this.router.url;
          if (currentRoute === '/') {
            window.location.reload();
          } else {
            this.router.navigate(['/']).then(() => window.location.reload());
          }
        },
        error: (error) => console.log(error),
      });
  }
}
