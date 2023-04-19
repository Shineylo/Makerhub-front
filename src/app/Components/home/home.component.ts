import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Ingredient} from "../../model/ingredient";
import {IngredientService} from "../../service/ingredient.service";
import {DecimalPipe} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-accueil',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  ingredients$: Observable<Ingredient[]>
  total$: Observable<number>;
  ingredients: Ingredient[] = [];

  constructor(readonly _ingredientService: IngredientService, pipe: DecimalPipe,private modalService: NgbModal) {
    this.ingredients$ = _ingredientService.ingredients$;
    this.total$ = _ingredientService.total$;
    this.ingredients$.subscribe(
    (resp) => this.ingredients = resp.slice(0,6)
    )
  }

}
