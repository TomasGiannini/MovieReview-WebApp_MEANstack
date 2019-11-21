import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { Review } from '../reviews/review.model'
import { map } from 'rxjs/operators';
import { PortalHostDirective } from '@angular/cdk/portal';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private reviews: Review[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        'http://localhost:3000/api/posts'
      )
      // pipe allows u to add in an operator
      // map allows u to get elements of an array and transform them then add them into new array?
      .pipe(map((postData => {
        // posts is returned as an array so we will map it to a new array with slight altercations
        // post.whatever is what is return from backend and we are redefining it for front end to get rid of the _id value that is returned
        // (CONTD from above) since the front end has property 'id', not '_id'
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
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }


  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  // returning true if the id were are looking for is one of the IDs of post
  getPost(id: string) {
    return this.http.get<{
      _id: string,
      title: string,
      content: string,
      creator: string,
      album: string,
      year: number,
      genre: string,
      comment: string,
      track: number,
      zeroByte: number,
      header: string
    }>('http://localhost:3000/api/posts/' + id);
  }

  addPost(title: string, content: string, album: string, year: number, genre: string, comment: string, track: number, zeroByte: number, header: string) {
    const post: Post = {
      id: null,
      title: title,
      content: content,
      creator: null,
      album: album,
      year: year,
      genre: genre,
      comment: comment,
      track: track,
      zeroByte: zeroByte,
      header: header };
    this.http
      .post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }


  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        // filter allows to only return a subset of an array
        // if returns true, element will be kept. If false, element will not be part of newly filtered array
        // this code is for updated the front end when a post is deleted
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }


  updatePost(id: string, title: string, content: string) {
    const post: Post = {
      id: id,
      title: title,
      content: content,
      creator: null
    };
    this.http
    .put('http://localhost:3000/api/posts/' + id, post)
    .subscribe(response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

}
