import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PortalHostDirective } from '@angular/cdk/portal';
import { Router } from '@angular/router';
import { Review } from './review.model';
import { Post } from '../posts/post.model';


@Injectable({providedIn: 'root'})
export class ReviewsService {
  private reviews: Review[] = [];
  private reviewsUpdated = new Subject<Review[]>();

  songs: Post[] = [];
  reviewSongs: Review[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  addReview(postTitle: string, rating: number, report: string) {

    const review: Review = {
      songSrc: postTitle,
      rating: rating,
      report: report
    };
    this.http
    .post<{ message: string }>('http://localhost:3000/api/reviews', review)
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

  getReviews() {
    this.http
      .get<{ message: string; reviews: any }>(
        'http://localhost:3000/api/reviews'
      )
      // pipe allows u to add in an operator
      // map allows u to get elements of an array and transform them then add them into new array?
      .pipe(map((reviewData => {
        // posts is returned as an array so we will map it to a new array with slight altercations
        // post.whatever is what is return from backend and we are redefining it for front end to get rid of the _id value that is returned
        // (CONTD from above) since the front end has property 'id', not '_id'
        return reviewData.reviews.map(review => {
          return {
            songSrc: review.songSrc,
            creator: 'creator',
            rating: review.rating,
            report: review.report
          };
        });
      })))
      .subscribe(transformedReviews => {
        this.reviews = transformedReviews;
        this.reviewsUpdated.next([...this.reviews]);
      });
  }

  getReviewUpdateListener() {
    return this.reviewsUpdated.asObservable();
  }

  getReviewsandSongs() {

    // get the reviews
    this.http
      .get<{ message: string; reviews: any }>(
        'http://localhost:3000/api/reviews'
      )
      .pipe(map((reviewData => {
        return reviewData.reviews.map(review => {
          return {
            songSrc: review.songSrc,
            creator: 'creator',
            rating: review.rating,
            report: review.report
          };
        });
      })))
      .subscribe(transformedReviews => {
        this.reviewSongs = transformedReviews;
      });

      // get the posts
      this.http
        .get<{ message: string; posts: any }>(
            'http://localhost:3000/api/posts'
          )
        .pipe(map((postData => {
            return postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                creator: post.creator,
                album: post.album,
                year: post.year,
                genre: post.genre,
                comment: post.comment,
                track: post.track,
                zeroByte: post.zeroByte,
                header: post.header
              };
            });
        })))
        .subscribe(transformedPosts => {
          this.songs = transformedPosts;
        });

  }

}
