import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PortalHostDirective } from '@angular/cdk/portal';
import { Router } from '@angular/router';
import { Review } from './review.model';

@Injectable({providedIn: 'root'})
export class ReviewsService {
  //private reviews: Review;
  private reviews: Review[] = [];
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

}
