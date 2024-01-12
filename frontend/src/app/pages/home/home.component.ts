import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { PostService } from '../../post.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CommonModule,
    FormsModule,
    HeaderComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  posts = inject(PostService);

  ngOnInit(): void {
    this.posts.getAllPosts().subscribe({
      next: (value) => {
        console.log(value);
        this.posts.allPosts = value;
      },
      error: (error: any) => console.log(error),
    });
  }
}
