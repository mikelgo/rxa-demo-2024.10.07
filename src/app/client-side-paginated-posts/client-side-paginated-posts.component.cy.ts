// const a

import { ClientSidePaginatedPostsComponent } from './client-side-paginated-posts.component';
import { DataService } from './data.service';
import { of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe(ClientSidePaginatedPostsComponent.name, () => {
	beforeEach(() => {
		// cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts', {
		//   fixture: 'posts.json'
		// }).as('getPosts');

		cy.mount(ClientSidePaginatedPostsComponent, {
			imports: [
				AsyncPipe,
				ReactiveFormsModule,
				MatFormField,
				MatInputModule,
				BrowserAnimationsModule,
			],
			providers: [
				{
					provide: DataService,
					useValue: {
						getIdList: () => of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
						getPostsForIds: (ids: number[]) =>
							of([
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
							]),
					},
				},
			],
		});
	});

	it('should show initially a list of posts', () => {
		cy.get('[data-testid="post"]').should('have.length', 10);
	});

	it('should show filtered results when a user types in a search query', () => {
		cy.get('[data-testid="search-field"]').type('Post 1');
		cy.get('[data-testid="post"]').should('have.length', 2);
		cy.get('[data-testid="post"]').first().should('contain.text', 'Post 1');
	});

	it('should show the full post list when the search query is deleted', () => {
		cy.get('[data-testid="search-field"]').type('Post 1');
		cy.get('[data-testid="post"]').should('have.length', 2);
		cy.get('[data-testid="search-field"]').clear();
		cy.get('[data-testid="post"]').should('have.length', 10);
	});
});
