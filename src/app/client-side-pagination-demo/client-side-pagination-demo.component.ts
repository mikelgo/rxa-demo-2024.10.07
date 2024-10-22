import { Component, inject } from '@angular/core';
import { DataService } from '../client-side-paginated-posts/data.service';
import { Post } from '../post-data.service';
import { switchMap } from 'rxjs';
import {
	CellBodyDirective,
	CellHeaderDirective,
	ClientSidePaginatedPostsComponent,
	RowComponent,
} from '../client-side-paginated-posts/client-side-paginated-posts.component';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'app-client-side-pagination-demo',
	standalone: true,
	imports: [
		RowComponent,
		CellHeaderDirective,
		CellBodyDirective,
		ClientSidePaginatedPostsComponent,
		AsyncPipe,
	],
	template: `
		<app-client-side-paginated-posts
			[filterFunction]="filterFunction"
			[data]="(posts$ | async)!"
			[displayedColumns]="columns"
		>
			<app-row [id]="'id'">
				<ng-container *app-cell-header> ID</ng-container>
				<ng-container *app-cell-body="let user"> {{ user.id }}</ng-container>
			</app-row>

			<app-row [id]="'userId'">
				<ng-container *app-cell-header> UserId</ng-container>
				<ng-container *app-cell-body="let user"> {{ user.userId }}</ng-container>
			</app-row>

			<app-row [id]="'title'">
				<ng-container *app-cell-header> Title</ng-container>
				<ng-container *app-cell-body="let user"> {{ user.title }}</ng-container>
			</app-row>

			<app-row [id]="'body'">
				<ng-container *app-cell-header> Body</ng-container>
				<ng-container *app-cell-body="let user"> {{ user.body }}</ng-container>
			</app-row>
		</app-client-side-paginated-posts>
	`,
})
export class ClientSidePaginationDemoComponent {
	#dataService = inject(DataService);

	columns = ['id', 'userId', 'title', 'body'];

	filterFunction = (post: Post, searchQuery: string) => post.title.includes(searchQuery ?? '');

	posts$ = this.#dataService
		.getIdList()
		.pipe(switchMap((ids) => this.#dataService.getPostsForIds(ids)));
}
