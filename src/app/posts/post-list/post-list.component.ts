import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../post.service';

@Component({
  selector:'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  // posts = [
  //   {title: 'First Post', content: 'This is 1st posts'},
  //   {title: 'Second Post', content: 'This is 2nd posts'},
  //   {title: 'Third Post', content: 'This is 3rd posts'},
  // ];

  posts: Post[] = [];
  private postsSub: Subscription;
  // postsService: PostsService;

  constructor(public postsService: PostsService) {
    // this.postsService = postsService;
  }

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) =>{
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
