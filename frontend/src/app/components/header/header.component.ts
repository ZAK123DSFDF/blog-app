import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  auth = inject(AuthService);
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}
  ngOnInit(): void {
    this.auth.checkAuth().subscribe({
      next: (value) => {
        console.log(value);
        this.auth.isAuthenticated = Object.values(value)[0];
        if (isPlatformBrowser(this.platformId)) {
          this.auth.username = Object.values(
            JSON.parse(localStorage.getItem('username') as string)
          )[1];
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  logOut() {
    this.auth.signOut();
  }
}
