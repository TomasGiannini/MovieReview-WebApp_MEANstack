import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from '../posts.service';
import { Post } from '../post.model';

import { ReviewsService } from '../../reviews/reviews.service';
import { Review } from '../../reviews/review.model';

// this is a custom built class template. We need to declare, import, etc
@Component({
  // selector used for creating html tag
  selector: 'app-post-create',
  // where the component file is
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent implements OnInit {

  enteredContent = '';
  enteredTitle = '';
  private mode = 'create';
  private postId: string;
  post: Post;
  review: Review;

  // used for the loading spinner
  isLoading = false;
  // must use a decorator to turn it into an event that can be listened to from the outside(aka parent component)
  // @Output() postCreated = new EventEmitter<Post>();

  constructor(public postsService: PostsService, public route: ActivatedRoute, public reviewsService: ReviewsService) {}

  // subscribing to an observable. Listening to changes in the route aka URL and can update UI depending if were adding
  // (contd) a post or edtiting a post
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // if the param in the URL has postID, which was defined in app-routing module
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            creator: postData.creator,
            album: postData.album,
            year: postData.year,
            genre: postData.genre,
            comment: postData.comment,
            track: postData.track,
            zeroByte: postData.zeroByte,
            header: postData.header};
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    // if the required fields are not populated, nothing will get added to post array
    if (form.invalid){
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(
        form.value.title,
        form.value.content,
        form.value.album,
        form.value.year,
        form.value.genre,
        form.value.comment,
        form.value.track,
        form.value.zeroByte,
        form.value.header);
        // check if a review was added
    if (form.value.report !== null && form.value.rating !== null) {
          // add the review
            this.reviewsService.addReview(form.value.title, form.value.rating, form.value.report);
    }

    } else {
      //this.postsService.updatePost(this.postId, form.value.title, form.value.content);
    }

    form.resetForm();
  }

  onAddReview(form: NgForm) {
    if(form.invalid) {
      return ;
    }
    this.reviewsService.addReview(form.value.title, form.value.rating, form.value.report);
  }
}
