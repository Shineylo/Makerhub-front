import {AsyncPipe, DatePipe, DecimalPipe, NgFor, NgIf} from '@angular/common';
import {
  Component,
  OnInit,
  PipeTransform,
  QueryList,
  ViewChildren
} from '@angular/core';
import { IngredientService } from "../../service/ingredient.service";
import { RouterLink } from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbHighlight, NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {filter, Observable} from "rxjs";
import { Ingredient } from "../../model/ingredient";
import { SorttableDirective, SortEvent } from "../../directive/sorttable.directive";

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [DecimalPipe, NgFor, SorttableDirective, DatePipe, RouterLink, ReactiveFormsModule, NgbPagination, AsyncPipe, FormsModule, NgbHighlight, NgIf],
  templateUrl: './accueil.component.html',
  providers: [IngredientService, DecimalPipe],
})
export class AccueilComponent implements OnInit{
  ingredients$: Observable<Ingredient[]>
  total$: Observable<number>;
  ingredients: Ingredient[]= [];

  @ViewChildren(SorttableDirective) headers!: QueryList<SorttableDirective>;

  constructor(readonly _ingredientService: IngredientService, pipe: DecimalPipe) {
    this.ingredients$ = _ingredientService.ingredients$;
    this.total$ = _ingredientService.total$;
  }

  ngOnInit(){
    this._ingredientService.getAll().subscribe({
      next: (resp => {
        this.ingredients = resp;
      })
    })
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this._ingredientService.sortColumn = column;
    this._ingredientService.sortDirection = direction;
  }

}
