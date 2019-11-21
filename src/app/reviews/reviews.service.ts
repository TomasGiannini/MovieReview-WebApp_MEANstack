import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PortalHostDirective } from '@angular/cdk/portal';
import { Router } from '@angular/router';
import { Review } from './review.model';

@Injectable({providedIn: 'root'})
export class ReviewsService {
  private reviews: Review;
  private reviewsUpdated = new Subject<Review[]>();
  //private reviewsUpdated = new Subject<Review[]>();

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
    return this.http
      .get<{ message: string, songSrc: string, rating: number, report: string }>(
        'http://localhost:3000/api/reviews'
      )
      .subscribe(transformedReviews => {
        this.reviews = transformedReviews;
        //this.postsUpdated.next([...this.posts]);
      });
  }

  getReviewUpdateListener() {
    return this.reviewsUpdated.asObservable();
  }

}
