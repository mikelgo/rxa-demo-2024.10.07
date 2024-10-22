import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SortDirection } from './list-filter/list-filter.component';
import { map, Observable, of, switchMap } from 'rxjs';
import { PostQuery } from './paginated-posts/paginated-posts.component';
import { Page, PageRequest } from './datasource';

export type Post = {
	userId: number;
	id: number;
	title: string;
	body: string;
};

@Injectable({
	providedIn: 'root',
})
export class PostDataService {
	#http = inject(HttpClient);

	constructor() {}

	getPosts(page: unknown, sort: unknown, query: unknown) {
		return this.#http.get<Array<Post>>('https://jsonplaceholder.typicode.com/posts');
	}

	page(request: PageRequest<Post>, query: PostQuery): Observable<Page<Post>> {
		return this.#http
			.get<
				Array<Post>
			>(`https://jsonplaceholder.typicode.com/posts?_start=${request.page * request.size}&_limit=100`)
			.pipe(
				switchMap((allPosts) =>
					of(allPosts).pipe(
						map((posts) => {
							if (query) {
								return posts.filter((post) => post.title.includes(query.search));
							} else {
								return posts;
							}
						}),
						map((posts) => {
							if (request.sort) {
								return posts.sort((a, b) => {
									// @ts-ignore
									const propA = a[request.sort?.property];
									// @ts-ignore
									const propB = b[request.sort?.property];
									let result;
									if (typeof propA === 'string') {
										result = propA.toLowerCase().localeCompare(propB.toString().toLowerCase());
									} else {
										result = (propA as any) - (propB as any);
									}
									const factor = request.sort?.order == 'asc' ? 1 : -1;
									return result * factor;
								});
							}

							return posts;
						}),
						map((posts) => {
							return {
								content: posts.slice(0, request.size),
								totalElements: allPosts.length,
								size: request.size,
								number: request.page,
							};
						}),
					),
				),
			);
	}
	getData() {
		return this.#http.get<Array<Post>>(`https://jsonplaceholder.typicode.com/posts`).pipe();
	}
	getPostById(id: number) {
		return this.#http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);
	}
}
