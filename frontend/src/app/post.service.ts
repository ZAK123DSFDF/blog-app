import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  router = inject(Router);
  baseUrl = environment.domain;
  imgBaseUrl = environment.imgDomain;
  http = inject(HttpClient);
  singlePost: any;
  allPosts: any;
  constructor() {}
  createPost(formData: any) {
    return this.http
      .post(this.baseUrl + '/api/post/upload/create', formData, {
        withCredentials: true,
      })
      .subscribe({
        next: (value) => {
          console.log(value);
          this.router.navigate(['/']);
        },
        error: (error) => console.log(error),
      });
  }
  getAllPosts() {
    return this.http.get(this.baseUrl + '/api/post');
  }
  getSinglePost(id: any) {
    return this.http.get(this.baseUrl + '/api/post/' + id);
  }
  editPost(id: any, updatedPost: FormData) {
    return this.http
      .patch(this.baseUrl + '/api/post/upload/update/' + id, updatedPost, {
        withCredentials: true,
      })
      .subscribe({
        next: (value) => {
          console.log(value);
          this.router.navigate(['/']);
        },
        error: (error) => console.log(error),
      });
  }
}
