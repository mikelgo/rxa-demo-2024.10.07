import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export type Post = {
  userId: number;
  id: number
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  #http = inject(HttpClient);

  constructor() { }

  getPosts(page: unknown, sort: unknown, query: unknown){
    return this.#http.get<Array<Post>>('https://jsonplaceholder.typicode.com/posts')
  }
  getPostById(id: number){
    return this.#http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)
  }
}
