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
export class ReviewCreateComponent implements OnInit {

private postTitle: string;
review: Review;

constructor(public reviewsService: ReviewsService, public route: ActivatedRoute) {}

ngOnInit() {

  this.route.paramMap.subscribe((paramMap: ParamMap) => {
    // if the param in the URL has postTitle, which was defined in app-routing module
    if (paramMap.has('postTitle')) {
      this.postTitle = paramMap.get('postTitle');
    }
  });

}

onSaveReview(form: NgForm) {
  // if the required fields are not populated, nothing will get added to post array
  if (form.invalid){
    return;
  }
  // postId is undefined here
  // rating and report are correct at this point
  this.reviewsService.addReview(
    this.postTitle,
    form.value.rating,
    form.value.report);

  form.resetForm();
}

}
