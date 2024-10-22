import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSidePaginatedPostsComponent } from './client-side-paginated-posts.component';

describe('ClientSidePaginatedPostsComponent', () => {
	let component: ClientSidePaginatedPostsComponent;
	let fixture: ComponentFixture<ClientSidePaginatedPostsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ClientSidePaginatedPostsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ClientSidePaginatedPostsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
