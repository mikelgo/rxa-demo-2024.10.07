import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PaginatedPostsComponent } from './paginated-posts/paginated-posts.component';
import {
	CellBodyDirective,
	CellHeaderDirective,
	ClientSidePaginatedPostsComponent,
	RowComponent,
} from './client-side-paginated-posts/client-side-paginated-posts.component';
import {
	MatCell,
	MatCellDef,
	MatColumnDef,
	MatHeaderCell,
	MatHeaderCellDef,
} from '@angular/material/table';
import { switchMap } from 'rxjs';
import { DataService } from './client-side-paginated-posts/data.service';
import { AsyncPipe } from '@angular/common';
import { startWith } from 'rxjs/operators';
import { Post } from './post-data.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		PostListComponent,
		PaginatedPostsComponent,
		ClientSidePaginatedPostsComponent,
		MatCell,
		MatCellDef,
		MatColumnDef,
		MatHeaderCell,
		AsyncPipe,
		MatHeaderCellDef,
		RowComponent,
		CellBodyDirective,
		CellHeaderDirective,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	title = 'rxa-demo';
	#dataService = inject(DataService);

	columns = ['id', 'userId', 'title', 'body'];

	filterFunction = (post: Post, searchQuery: string) => post.title.includes(searchQuery ?? '');

	posts$ = this.#dataService
		.getIdList()
		.pipe(switchMap((ids) => this.#dataService.getPostsForIds(ids)));
}
