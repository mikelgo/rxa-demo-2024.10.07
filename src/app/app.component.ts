import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PaginatedPostsComponent } from './paginated-posts/paginated-posts.component';
import {
	CellBodyDirective,
	CellHeaderDirective,
	ClientSidePaginatedPostsComponent,
	ColumnComponent,
} from './client-side-paginated-posts/client-side-paginated-posts.component';
import {
	MatCell,
	MatCellDef,
	MatColumnDef,
	MatHeaderCell,
	MatHeaderCellDef,
} from '@angular/material/table';
import { AsyncPipe } from '@angular/common';

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
		ColumnComponent,
		CellBodyDirective,
		CellHeaderDirective,
		RouterLink,
	],
	template: `
		<nav class="w-full bg-amber-200">
			<ul class="flex flex-row gap-2 justify-end items-center">
				<li><a routerLink="/rx-state">RxState</a></li>
				<li><a routerLink="/pagination-server-side">Server Side Pagination</a></li>
				<li><a routerLink="/pagination-client-side">Client Side Pagination</a></li>
			</ul>
		</nav>
		<router-outlet></router-outlet>
	`,
	styles: `
		li {
			@apply py-2 font-semibold hover:bg-amber-400 px-4;
		}
	`,
})
export class AppComponent {
	title = 'rxa-demo';
}
