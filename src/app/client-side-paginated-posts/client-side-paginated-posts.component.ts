import {
	Component,
	contentChild,
	contentChildren,
	Directive,
	input,
	TemplateRef,
	viewChild,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, map, merge, withLatestFrom } from 'rxjs';
import { AsyncPipe, NgComponentOutlet, NgIf, NgTemplateOutlet } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
	MatCell,
	MatCellDef,
	MatColumnDef,
	MatHeaderCell,
	MatHeaderCellDef,
	MatHeaderRow,
	MatHeaderRowDef,
	MatRow,
	MatRowDef,
	MatTable,
	MatTableDataSource,
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { toObservable } from '@angular/core/rxjs-interop';
import { rxEffects } from '@rx-angular/state/effects';

export type FilterFn<T> = (value: T, query: string) => boolean;

@Directive({
	standalone: true,
	selector: '[app-cell-header]',
})
export class CellHeaderDirective {
	constructor(public template: TemplateRef<any>) {}
}
@Directive({
	standalone: true,
	selector: '[app-cell-body]',
})
export class CellBodyDirective<T> {
	constructor(public template: TemplateRef<T>) {}
}

@Component({
	selector: 'app-row',
	template: '',
	standalone: true,
})
export class RowComponent<T> {
	id = input.required<string>();
	cellHeader = contentChild(CellHeaderDirective);
	cellBody = contentChild(CellBodyDirective<T>);
}

/**
 * Steps:
 * idListe und Entitäten laden
 * Filterung
 * Paginierung Clientseitig
 */

@Component({
	selector: 'app-client-side-paginated-posts',
	standalone: true,
	imports: [
		AsyncPipe,
		ReactiveFormsModule,
		MatFormField,
		MatInputModule,
		MatCell,
		MatCellDef,
		MatColumnDef,
		MatHeaderCell,
		MatHeaderRow,
		MatHeaderRowDef,
		MatPaginator,
		MatRow,
		MatRowDef,
		MatSort,
		MatTable,
		NgIf,
		NgTemplateOutlet,
		NgComponentOutlet,
		MatHeaderCellDef,
	],
	template: `
		<mat-form-field class="w-full">
			<mat-label>Suche</mat-label>
			<input data-testid="search-field" matInput [formControl]="searchFormControl" />
		</mat-form-field>
		@if (cells()) {
			<table
				mat-table
				[dataSource]="datasource"
				matSort
				(matSortChange)="sortBy($event)"
				matSortActive="username"
				matSortStart="asc"
				matSortDisableClear
				class="mat-elevation-z1"
			>
				@for (cell of cells(); track $index) {
					<ng-container matColumnDef="{{ cell.id() }}">
						<th mat-header-cell *matHeaderCellDef mat-sort-header>
							<ng-container *ngTemplateOutlet="cell.cellHeader()!.template"></ng-container>
						</th>
						<td mat-cell *matCellDef="let data">
							<ng-container
								*ngTemplateOutlet="cell.cellBody()!.template; context: { $implicit: data }"
							></ng-container>
						</td>
					</ng-container>
				}

				<tr mat-header-row *matHeaderRowDef="displayedColumns()"></tr>
				<tr mat-row *matRowDef="let row; columns: displayedColumns()"></tr>
			</table>
			<mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons> > </mat-paginator>
		}
	`,
	styles: `
		:host {
			display: block;
			padding: 16px;
		}
	`,
})
export class ClientSidePaginatedPostsComponent<T> {
	paginator = viewChild.required(MatPaginator);
	sort = viewChild.required(MatSort);

	cells = contentChildren(RowComponent<T>, { descendants: true });

	#effects = rxEffects();
	data = input.required<T[]>();
	displayedColumns = input.required<string[]>();
	filterFunction = input.required<FilterFn<T>>();

	datasource = new MatTableDataSource<T>([]);

	searchFormControl = new FormControl<string>('', { nonNullable: true });

	searchQuery$ = this.searchFormControl.valueChanges.pipe(
		debounceTime(500),
		map((query) => query?.trim()?.toLowerCase()),
		distinctUntilChanged(),
	);

	data$ = toObservable(this.data);

	filteredPosts$ = this.searchQuery$.pipe(
		withLatestFrom(this.data$),
		map(([searchQuery, posts]) => posts.filter((post) => this.filterFunction()(post, searchQuery))),
	);

	result$ = merge(this.data$, this.filteredPosts$);

	constructor() {
		this.#effects.register(this.result$, (data) => {
			this.datasource.data = data;
			this.datasource.paginator = this.paginator();
			this.datasource.sort = this.sort();
			this.datasource.paginator.firstPage();
		});
	}

	sortBy(sortChange: Sort) {}
}
