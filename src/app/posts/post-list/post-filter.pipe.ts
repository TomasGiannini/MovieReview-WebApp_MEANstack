import { PipeTransform, Pipe } from '@angular/core';
import { of } from 'rxjs';
import { Post } from '../post.model';

@Pipe({
  name: 'postFilter'
})
export class PostFilterPipe implements PipeTransform {

  transform(posts: Post[], searchTerm: any): Post[] {
    if (!posts || !searchTerm) {
      return posts;
    }

    return posts.filter(post =>
      (post.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
      (post.content.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
      (post.album.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
      (post.genre.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
      (post.header.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
      (post.comment.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
      (post.year.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1));
  }
}
