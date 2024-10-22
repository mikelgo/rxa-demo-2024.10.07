import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../post-data.service';
import { delay, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
	#http = inject(HttpClient);

	getIdList() {
		return of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).pipe(delay(1000));
	}

	getPostsForIds(idList: number[]) {
		return this.#http
			.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
			.pipe(map((posts) => posts.filter((post) => idList.includes(post.id))));
	}
}
