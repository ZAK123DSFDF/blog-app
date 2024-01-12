import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink, HeaderComponent],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  auth = inject(AuthService);
  @ViewChild('signup') signup!: NgForm;
  checksignup() {
    this.auth.signupAuth(this.signup.value);
    this.signup.reset();
  }
}
