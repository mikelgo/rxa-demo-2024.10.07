// const a

import {
	CellBodyDirective,
	CellHeaderDirective,
	ClientSidePaginatedPostsComponent,
	FilterFn,
	RowComponent,
} from './client-side-paginated-posts.component';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';

@Component({
	selector: 'app-test-host',
	imports: [
		ClientSidePaginatedPostsComponent,
		CellBodyDirective,
		RowComponent,
		CellHeaderDirective,
	],
	standalone: true,
	template: `
		<app-client-side-paginated-posts
			[data]="data"
			[displayedColumns]="['id', 'title']"
			[filterFunction]="filterFunction"
		>
			<app-row [id]="'id'">
				<ng-container *app-cell-header> ID</ng-container>
				<ng-container *app-cell-body="let user"> {{ user.id }}</ng-container>
			</app-row>
			<app-row [id]="'title'">
				<ng-container *app-cell-header> Title</ng-container>
				<ng-container *app-cell-body="let user"> {{ user.title }}</ng-container>
			</app-row>
		</app-client-side-paginated-posts>
	`,
})
class TestHostComponent {
	data = [
		{ id: 1, title: 'Post 1' },
		{ id: 2, title: 'Post 2' },
		{ id: 3, title: 'Post 3' },
		{ id: 4, title: 'Post 4' },
		{ id: 5, title: 'Post 5' },
		{ id: 6, title: 'Post 6' },
		{ id: 7, title: 'Post 7' },
		{ id: 8, title: 'Post 8' },
		{ id: 9, title: 'Post 9' },
		{ id: 10, title: 'Post 10' },
	];

	filterFunction: FilterFn<{ id: number; title: string }> = (value, query) =>
		value.title.trim().toLowerCase().includes(query);
}

describe(ClientSidePaginatedPostsComponent.name, () => {
	beforeEach(() => {
		// cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts', {
		//   fixture: 'posts.json'
		// }).as('getPosts');

		cy.mount(TestHostComponent, {
			imports: [
				AsyncPipe,
				ReactiveFormsModule,
				MatFormField,
				MatInputModule,
				BrowserAnimationsModule,
			],
		});
	});

	it('should show initially a list of posts', () => {
		getRows().should('have.length', 5);
	});

	it('should show filtered results when a user types in a search query', () => {
		cy.get('[data-testid="search-field"]').type('Post 1');
		getRows().should('have.length', 2);
		getRows().first().should('contain.text', 'Post 1');
	});

	it('should show the full post list when the search query is deleted', () => {
		cy.get('[data-testid="search-field"]').type('Post 1');
		getRows().should('have.length', 2);
		cy.get('[data-testid="search-field"]').clear();
		getRows().should('have.length', 5);
	});
});

function getRows() {
	return cy.get('tbody tr');
}
