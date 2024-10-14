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
  switchMap
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
      <input matInput [formControl]="searchFormControl">
    </mat-form-field>
    Suche: {{searchQuery$ | async}}

    @if(data$ | async; as data ){
       @for(post of data; track post.id){
      <div>{{post.title}}</div>
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

   searchFormControl = new FormControl('')

   searchQuery$ = this.searchFormControl.valueChanges.pipe(
    debounceTime(500),
    filter(Boolean),
    filter(query => query?.length > 2),
    distinctUntilChanged(),
   )

   data$ = this.#dataService.getIdList().pipe(
   // exhaustMap, concatMap, mergeMap
    switchMap(ids => this.#dataService.getPostsForIds(ids))
   )



}
