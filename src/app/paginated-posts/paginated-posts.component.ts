import { Component, inject, ViewChild } from '@angular/core';
import {
	MatCell,
	MatCellDef,
	MatColumnDef,
	MatHeaderCell,
	MatHeaderCellDef,
	MatHeaderRow,
	MatHeaderRowDef,
	MatRow,
	MatRowDef,
	MatTable,
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatSort, Sort } from '@angular/material/sort';
import { Post, PostDataService } from '../post-data.service';
import { PaginationDataSource } from '../datasource';

export interface PostQuery {
	search: string;
	// onlyReleased: boolean;
}

@Component({
	selector: 'app-paginated-posts',
	standalone: true,
	imports: [
		MatCell,
		MatCellDef,
		MatColumnDef,
		MatHeaderCell,
		MatHeaderRow,
		MatHeaderRowDef,
		MatPaginator,
		MatRow,
		MatRowDef,
		MatTable,
		MatHeaderCellDef,
		NgIf,
		MatSort,
		AsyncPipe,
	],
	styleUrl: './paginated-posts.component.css',
	template: `
		<table
			mat-table
			[dataSource]="data"
			matSort
			(matSortChange)="sortBy($event)"
			matSortActive="username"
			matSortStart="asc"
			matSortDisableClear
			class="mat-elevation-z1"
		>
			<ng-container matColumnDef="id">
				<th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>
				<td mat-cell *matCellDef="let user">{{ user.id }}</td>
			</ng-container>

			<ng-container matColumnDef="userId">
				<th mat-header-cell *matHeaderCellDef mat-sort-header>UserId</th>
				<td mat-cell *matCellDef="let user">{{ user.userId }}</td>
			</ng-container>

			<ng-container matColumnDef="title">
				<th mat-header-cell *matHeaderCellDef mat-sort-header>Title</th>
				<td mat-cell *matCellDef="let user">{{ user.title }}</td>
			</ng-container>

			<ng-container matColumnDef="body">
				<th mat-header-cell *matHeaderCellDef mat-sort-header="body">Body</th>
				<td mat-cell *matCellDef="let user">{{ user.body }}</td>
			</ng-container>

			<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
			<tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
		</table>
		<mat-paginator
			*ngIf="data.page$ | async as page"
			[length]="page.totalElements"
			[pageSize]="page.size"
			[pageIndex]="page.number"
			[hidePageSize]="true"
			(page)="data.fetch($event.pageIndex)"
		>
		</mat-paginator>
	`,
})
export class PaginatedPostsComponent {
	readonly #postsDataService = inject(PostDataService);
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatPaginator;

	displayedColumns = ['id', 'userId', 'title', 'body'];

	data = new PaginationDataSource<Post, PostQuery>(
		(request, query) => this.#postsDataService.page(request, query),
		{ property: 'id', order: 'asc' },
		{ search: '' },
		2,
	);

	sortBy({ active, direction }: Sort) {
		this.data.sortBy({
			property: active as keyof Post,
			order: direction || 'asc',
		});
	}
}
