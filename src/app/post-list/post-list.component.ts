import { Component, inject } from '@angular/core';
import { Post, PostDataService } from '../post-data.service';
import { AsyncPipe } from '@angular/common';
import { rxActions } from '@rx-angular/state/actions';
import { combineLatest, map, merge, switchMap } from 'rxjs';

import { rxState } from '@rx-angular/state';
import { PaginatorComponent } from './paginator/paginator.component';
import { ListFilterComponent, SortDirection } from './list-filter/list-filter.component';

interface ComponentState {
	page: number;
	sort: SortDirection;
	query: string;
	selectedPost: Post | null;
	posts: Post[];
}

@Component({
	selector: 'app-post-list',
	standalone: true,
	imports: [AsyncPipe, PaginatorComponent, ListFilterComponent],
	styleUrl: './post-list.component.css',
	template: `
		<h2>Posts</h2>
		<button (click)="reloadList()">Liste neuladen</button>
		<button (click)="resetList()">Liste zurücksetzen</button>
		<app-paginator (pageChange)="onPageChange($event)" />
		<app-list-filter
			(searchQueryChange)="onQueryChange($event)"
			(sortChange)="onSortChange($event)"
		/>
		<div>
			@if (readOnlyState.signal('selectedPost')()) {
				<h3>{{ selectedPost()?.title }}</h3>
			} @else {
				Kein Post ausgewählt!
			}
		</div>
		<ul>
			@for (post of posts(); track post.id) {
				<li (click)="selectPost(post)">
					{{ post.title }}
				</li>
			}
		</ul>
	`,
})
export class PostListComponent {
	#state = rxState<ComponentState>();

	readOnlyState = this.#state.asReadOnly();

	#dataServie = inject(PostDataService);
	#actions = rxActions<{
		reloadList: void;
		resetList: void;
		pageChange: number;
		sortChange: SortDirection;
		searchQueryChange: string;
	}>();

	posts = this.#state.signal('posts');
	selectedPost = this.#state.signal('selectedPost');

	constructor() {
		this.#state.set({ selectedPost: null, page: 0, query: '', sort: 'asc' });

		this.#state.connect(
			'posts',
			merge(
				combineLatest([
					this.#actions.pageChange$,
					this.#actions.sortChange$,
					this.#actions.searchQueryChange$,
				]).pipe(switchMap(([page, sort, query]) => this.#dataServie.getPosts(page, sort, query))),
				this.#dataServie.getPosts(
					this.#state.get('page'),
					this.#state.get('sort'),
					this.#state.get('query'),
				),
				this.#actions.resetList$.pipe(map(() => [])),
			),
		);
	}

	selectPost(post: Post) {
		this.#state.set({ selectedPost: post });
	}
	reloadList() {
		this.#actions.reloadList();
	}
	resetList() {
		this.#actions.resetList();
	}
	onPageChange(page: number) {
		this.#actions.pageChange(page);
	}
	onQueryChange(query: string) {
		this.#actions.searchQueryChange(query);
	}
	onSortChange(sort: 'asc' | 'desc') {
		this.#actions.sortChange(sort);
	}
}
