import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PostListComponent} from './post-list/post-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PostListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rxa-demo';
}
