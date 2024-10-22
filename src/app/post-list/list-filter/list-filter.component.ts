import { Component, EventEmitter, Output } from '@angular/core';
export type SortDirection = 'asc' | 'desc';

@Component({
	selector: 'app-list-filter',
	standalone: true,
	imports: [],
	templateUrl: './list-filter.component.html',
	styleUrl: './list-filter.component.css',
})
export class ListFilterComponent {
	@Output() sortChange = new EventEmitter<SortDirection>();
	@Output() searchQueryChange = new EventEmitter<string>();
}
