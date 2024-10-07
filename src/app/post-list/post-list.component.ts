import {Component, inject} from '@angular/core';
import {Post, PostDataService} from '../post-data.service';
import {rxEffects} from '@rx-angular/state/effects';
import {AsyncPipe} from '@angular/common';
import {rxActions} from '@rx-angular/state/actions';
import {combineLatest, map, merge, Subject, switchMap} from 'rxjs';
import {PaginatorComponent} from '../paginator/paginator.component';
import {ListFilterComponent, SortDirection} from '../list-filter/list-filter.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    AsyncPipe,
    PaginatorComponent,
    ListFilterComponent
  ],
  styleUrl: './post-list.component.css',
  template: `
    <h2>Posts</h2>
    <button (click)="reloadList()">Liste neuladen</button>
    <button (click)="resetList()">Liste zurücksetzen</button>
    <app-paginator (pageChange)="onPageChange($event)"/>
    <app-list-filter (searchQueryChange)="onQueryChange($event)" (sortChange)="onSortChange($event)"/>
    <div>
      @if(selectedPost){
        <h3>{{ selectedPost.title }}</h3>
      } @else {
        Kein Post ausgewählt!
      }
    </div>
    <ul>
        @for(post of posts$ | async; track post.id){
           <li (click)="selectPost(post)">
                {{ post.title }}
            </li>
        }

    </ul>
  `
})
export class PostListComponent {
  #dataServie = inject(PostDataService);
  #actions = rxActions<{reloadList: void, resetList: void, pageChange: number, sortChange: SortDirection, searchQueryChange: string}>();

  initialPage = 0;
  initialSort: SortDirection = 'asc';
  initialQuery = '';
  posts$ = merge(

    combineLatest([
      this.#actions.pageChange$,
      this.#actions.sortChange$,
      this.#actions.searchQueryChange$
    ]).pipe(
      switchMap(([page, sort, query]) => this.#dataServie.getPosts(page, sort, query))
    ),
    this.#dataServie.getPosts(this.initialPage, this.initialSort, this.initialQuery),
    this.#actions.resetList$.pipe(map(() => []))
  )
  selectedPost: Post | null = null;


  selectPost(post: Post){
    this.selectedPost = post;
  }
  reloadList(){
    this.#actions.reloadList();
  }
  resetList(){
    this.#actions.resetList()
  }
  onPageChange(page: number){
    this.#actions.pageChange(page);
  }
  onQueryChange(query: string){
    this.#actions.searchQueryChange(query);
  }
  onSortChange(sort: 'asc' | 'desc'){
    this.#actions.sortChange(sort);
  }
}
