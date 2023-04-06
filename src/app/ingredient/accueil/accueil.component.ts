import {AsyncPipe, DatePipe, DecimalPipe, NgFor} from '@angular/common';
import {
  Component,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  PipeTransform,
  QueryList,
  ViewChildren
} from '@angular/core';
import { IngredientService } from "../../service/ingredient.service";
import {RouterLink} from "@angular/router";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {async, map, Observable, startWith} from "rxjs";

interface Ingredient {
  name: string;
  price: number;
  quantity: number;
  unitOfMeasure: string;
  brand: string;
  expiration: string;
}

export type SortColumn = keyof Ingredient | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  standalone: true,
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdSortableHeader {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'ngbd-table-sortable',
  standalone: true,
  imports: [DecimalPipe, NgFor, NgbdSortableHeader, DatePipe, RouterLink, ReactiveFormsModule, NgbPagination, AsyncPipe],
  templateUrl: './accueil.component.html',
})
export class AccueilComponent implements OnInit{
  ingredients:any[] = [];
  ingredientsFilter$:Observable<any[]>
  filter = new FormControl('', { nonNullable: true });
  page = 1;
  pageSize = 15;
  collectionSize = this.ingredients.length;

  constructor(private readonly _ingredientService: IngredientService,pipe: DecimalPipe) {
    this.refreshCountries();
    this.ingredientsFilter$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text, pipe)),
    );
  }

  refreshCountries() {
    this.ingredients = this.ingredients.map((ingredient, i) => ({ id: i + 1, ...ingredient })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

  ngOnInit(){
    this._ingredientService.getAll().subscribe({
      next: (resp => {
        this.ingredients = resp;
      })
    })
  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader> | undefined;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    // @ts-ignore
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this._ingredientService.getAll().subscribe({
        next: (resp =>this.ingredients = resp)
      })
    } else {
      this.ingredients = this.ingredients.sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  search(text: string, pipe: PipeTransform): Ingredient[] {
    return this.ingredients.filter((ingredient) => {
      const term = text.toLowerCase();
      return (
        ingredient.name.toLowerCase().includes(term) ||
        pipe.transform(ingredient.price).includes(term) ||
        pipe.transform(ingredient.quantity).includes(term)
      );
    });
  }

}
