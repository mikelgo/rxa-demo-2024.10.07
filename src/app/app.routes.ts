import { Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PaginatedPostsComponent } from './paginated-posts/paginated-posts.component';
import { ClientSidePaginationDemoComponent } from './client-side-pagination-demo/client-side-pagination-demo.component';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'pagination-client-side',
	},
	{
		path: 'rx-state',
		component: PostListComponent,
	},
	{
		path: 'pagination-server-side',
		component: PaginatedPostsComponent,
	},
	{
		path: 'pagination-client-side',
		component: ClientSidePaginationDemoComponent,
	},
];
