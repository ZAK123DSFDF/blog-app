import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../post.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [NgOptimizedImage, HeaderComponent, CommonModule, RouterLink],
  templateUrl: './post-details.component.html',
})
export class PostDetailsComponent implements OnInit {
  auth = inject(AuthService);
  Post = inject(PostService);
  PostsDetails: any;
  route = inject(ActivatedRoute);
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = params.get('id');
      this.Post.getSinglePost(postId).subscribe({
        next: (value: any) => {
          console.log(value);
          this.PostsDetails = value;
        },
        error: (error: any) => console.log(error),
      });
    });
  }
}
