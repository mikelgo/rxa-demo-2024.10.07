import {Component, inject} from '@angular/core';
import {DataService} from './data.service';
import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  exhaustMap,
  filter,
  map,
  mergeMap,
  Subject,
  switchMap,
  merge
} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';

/**
 * Steps:
 * idListe und Entitäten laden
 * Filterung
 * Paginierung Clientseitig
 */

@Component({
  selector: 'app-client-side-paginated-posts',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, MatFormField, MatInputModule],
  template: `
    <mat-form-field >
      <mat-label>Suche</mat-label>
      <input data-testid="search-field" matInput [formControl]="searchFormControl">
    </mat-form-field>
    Suche: {{searchQuery$ | async}}

    @if(result$ | async; as data ){
       @for(post of data; track post.id){
        <div data-testid="post">{{post.title}}</div>
        }
    } @else {
      <div>Loading...</div>
    }


`,
  styles: `
    :host{
        display: block;
        padding: 16px;
    }
`
})
export class ClientSidePaginatedPostsComponent {
   #dataService = inject(DataService)

   searchFormControl = new FormControl<string>('', {nonNullable: true})

   searchQuery$ = this.searchFormControl.valueChanges.pipe(
    debounceTime(500),
    map(query => query?.trim()?.toLowerCase()),
    distinctUntilChanged(),
   )

   posts$ = this.#dataService.getIdList().pipe(
    switchMap(ids => this.#dataService.getPostsForIds(ids))
   )

   filteredPosts$ = this.searchQuery$.pipe(
    switchMap(searchQuery => this.posts$.pipe(
      map(posts => posts.filter(post => post.title.includes(searchQuery ?? '')))
    ))
   )

   result$ = merge(
    this.posts$,
    this.filteredPosts$,
   )

}
