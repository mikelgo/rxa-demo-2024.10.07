import {Component, inject} from '@angular/core';
import {Post, PostDataService} from '../post-data.service';
import {rxEffects} from '@rx-angular/state/effects';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [],
  styleUrl: './post-list.component.css',
  template: `
    <h2>Posts</h2>
    <div>
      @if(selectedPost){
        <h3>{{ selectedPost.title }}</h3>
      } @else {
        Kein Post ausgewählt!
      }
    </div>
    <ul>
        @for(post of posts; track post.id){
           <li (click)="selectPost(post)">
                {{ post.title }}
            </li>
        }

    </ul>
  `
})
export class PostListComponent {
  #dataServie = inject(PostDataService);
  #effects = rxEffects();

  posts: Array<Post> = [];
  selectedPost: Post | null = null;

  constructor() {
    this.#effects.register(
      this.#dataServie.getPosts(), posts => this.posts = posts
    );
  }

  selectPost(post: Post){
    this.selectedPost = post;
    }
}
