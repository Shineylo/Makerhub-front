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
import {filter, map, Observable} from "rxjs";
import { Ingredient } from "../../model/ingredient";

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [DecimalPipe, NgFor, DatePipe, RouterLink, ReactiveFormsModule, NgbPagination, AsyncPipe, FormsModule, NgbHighlight, NgIf],
  templateUrl: './home.component.html',
  providers: [IngredientService, DecimalPipe],
})
export class HomeComponent implements OnInit{
  ingredients$: Observable<Ingredient[]>
  total$: Observable<number>;
  ingredientId=0;
  ingredientName ="none"

  constructor(readonly _ingredientService: IngredientService, pipe: DecimalPipe,private modalService: NgbModal) {
    this.ingredients$ = _ingredientService.ingredients$;
    this.total$ = _ingredientService.total$;
  }

  ngOnInit(){
  }

  openVerticallyCentered({content}: { content: any }) {
    this.modalService.open(content, { centered: true });
  }

  delete() {
    this._ingredientService.delete(this.ingredientId);
    this.modalService.dismissAll();
  }
}
