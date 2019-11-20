import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { Review } from '../review.model';
import { PostsService } from '../posts.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {

  // decorator is used again to make this shit visible to the main app.component files
  posts: Post[] = [];
  reviews: Review[] = [];
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId: string;

  // angular calls and gives u the parameters for this constrcutor auto
  // public keyword auto creates new property called postsService of type class PostsService
  constructor(public postsService: PostsService, private authService: AuthService) {}

  // function auto executed when this component is created
  // do basic initialization tasks
  ngOnInit() {
    this.postsService.getPosts();
    this.userId = this.authService.getUserId();
    // listening for the subject in postsService for everytime new posts are pushed to list
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
      // check auth status right away for edit/delete buttons
      this.userIsAuthenticated = this.authService.getIsAuth();
      // make this components subscription service subscribe to the observable in authService
      this.authStatusSub = this.authService.getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
        });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
