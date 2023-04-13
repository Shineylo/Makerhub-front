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
import {NgbHighlight, NgbModal, NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {filter, Observable} from "rxjs";
import { Ingredient } from "../../model/ingredient";
import { SorttableDirective, SortEvent } from "../../directive/sorttable.directive";

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [DecimalPipe, NgFor, SorttableDirective, DatePipe, RouterLink, ReactiveFormsModule, NgbPagination, AsyncPipe, FormsModule, NgbHighlight, NgIf],
  templateUrl: './home.component.html',
  providers: [IngredientService, DecimalPipe],
})
export class HomeComponent implements OnInit{
  ingredients$: Observable<Ingredient[]>
  total$: Observable<number>;

  @ViewChildren(SorttableDirective) headers!: QueryList<SorttableDirective>;

  constructor(readonly _ingredientService: IngredientService, pipe: DecimalPipe,private modalService: NgbModal) {
    this.ingredients$ = _ingredientService.ingredients$;
    this.total$ = _ingredientService.total$;
  }

  ngOnInit(){
    console.log(this._ingredientService.listingredients);
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

  openVerticallyCentered({content}: { content: any }) {
    this.modalService.open(content, { centered: true });
  }

}
