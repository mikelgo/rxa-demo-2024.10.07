import { Injectable } from '@angular/core';
import { rxState } from '@rx-angular/state';

interface State {}

@Injectable({
	providedIn: 'root',
})
export class PostsStateService {
	#state = rxState<State>();
	constructor() {}

	posts$ = this.#state.select('posts');
}
