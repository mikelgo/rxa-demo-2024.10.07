import {Component, inject} from '@angular/core';
import {DataService} from './data.service';
import {concatMap, exhaustMap, map, mergeMap, Subject, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-client-side-paginated-posts',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <button (click)="click$.next()">click</button>
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

   click$ = new Subject<void>()

   data$ = this.#dataService.getIdList().pipe(
   // exhaustMap, concatMap, mergeMap
    switchMap(ids => this.#dataService.getPostsForIds(ids))
   )

   constructor() {
    this.#dataService.getIdList().subscribe(idList => {
      this.#dataService.getPostsForIds(idList).subscribe()
    })
   }

}
