import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { Review } from '../../reviews/review.model';
import { PostsService } from '../posts.service';
import { ReviewsService } from '../../reviews/reviews.service';
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
  public reviewsSub: Subscription;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId: string;
  searchTerm: string;

  numSongs = 0;
  numReviews = 0;
  currentSong: string;
  currentAvg = 0;
  currentSum = 0;
  currentReviewCount = 0;

  // angular calls and gives u the parameters for this constrcutor auto
  // public keyword auto creates new property called postsService of type class PostsService
  constructor(public postsService: PostsService, private authService: AuthService, public reviewsService: ReviewsService) {}

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

      // obtain all reviews
      this.reviewsService.getReviews();
      // listening for the subject in postsService for everytime new posts are pushed to list
      this.reviewsSub = this.reviewsService.getReviewUpdateListener()
        .subscribe((reviews: Review[]) => {
          this.reviews = reviews;
        });

    this.numSongs = this.posts.length;
    this.numReviews = this.reviews.length;

    // loop songs
    for(const song of this.posts) {

      this.currentSong = song.title;

      // loop reviews
      for(let review of this.reviews) {

        // if a review is for the song we are currently on
        if (review.songSrc === song.title) {
          this.currentSum = review.rating + this.currentSum;
          this.currentReviewCount ++;
        }

      }
      // average rating for song x
      this.currentAvg = this.currentSum / this.currentReviewCount;
      song.avgRating = this.currentAvg;

    }

  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
