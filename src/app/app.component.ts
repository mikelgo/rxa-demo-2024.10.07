import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PostListComponent} from './post-list/post-list.component';
import {PaginatedPostsComponent} from './paginated-posts/paginated-posts.component';
import {ClientSidePaginatedPostsComponent} from './client-side-paginated-posts/client-side-paginated-posts.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PostListComponent, PaginatedPostsComponent, ClientSidePaginatedPostsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rxa-demo';
}
