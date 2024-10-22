import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-paginator',
	standalone: true,
	imports: [],
	templateUrl: './paginator.component.html',
	styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
	@Output() pageChange = new EventEmitter<number>();
}
