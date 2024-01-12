import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, HeaderComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  auth = inject(AuthService);
  @ViewChild('login') login!: NgForm;
  checklogin() {
    this.auth.loginAuth(this.login.value);
    this.login.reset();
  }
  signout() {
    this.auth.signOut();
  }
}
