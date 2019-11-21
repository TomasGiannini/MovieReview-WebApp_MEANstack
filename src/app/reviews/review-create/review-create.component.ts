import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ReviewsService } from '../reviews.service';
import { Review } from '../review.model';

// this is a custom built class template. We need to declare, import, etc
@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html'

})
export class ReviewCreateComponent {

private postId: string;
review: Review;

constructor(public reviewsService: ReviewsService) {}

onSaveReview(form: NgForm) {
  // if the required fields are not populated, nothing will get added to post array
  if (form.invalid){
    return;
  }
  // postId is undefined here
  // rating and report are correct at this point
  this.reviewsService.addReview(
    this.postId,
    form.value.rating,
    form.value.report);

  form.resetForm();
}

}
