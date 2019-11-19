import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  /*
  posts =[
    {title: 'First post', content: '1st post content'},
    {title: 'Second post', content: '2nd post content'},
    {title: 'Third post', content: '3rd post content'}
  ];
  */
  // decorator is used again to make this shit visible to the main app.component files
  posts: Post[] = [];
  private postsSub: Subscription;

  // angular calls and gives u the parameters for this constrcutor auto
  // public keyword auto creates new property called postsService of type class PostsService
  constructor(public postsService: PostsService) {}

  // function auto executed when this component is created
  // do basic initialization tasks
  ngOnInit() {
    this.postsService.getPosts();
    // listening for the subject in postsService for everytime new posts are pushed to list
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
