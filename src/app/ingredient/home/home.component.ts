import {AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe, NgFor, NgIf} from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import { IngredientService } from "../../service/ingredient.service";
import { RouterLink } from "@angular/router";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgbHighlight, NgbModal, NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import { Observable} from "rxjs";
import { Ingredient } from "../../model/ingredient";
import {IngredientBrand} from "../../model/ingredientBrand";

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [DecimalPipe, NgFor, DatePipe, RouterLink, ReactiveFormsModule, NgbPagination, AsyncPipe, FormsModule, NgbHighlight, NgIf, CurrencyPipe],
  templateUrl: './home.component.html',
  providers: [IngredientService, DecimalPipe],
})
export class HomeComponent implements OnInit{
  ingredients$: Observable<Ingredient[]>
  total$: Observable<number>;
  ingredientId= 0;
  ingredientName = "none";
  ingredientUnit= "";
  ingredientBrandName = "";
  ingredientBrandId: number = 0;
  ingredientBrands:IngredientBrand[] = [];

  constructor(readonly _ingredientService: IngredientService, pipe: DecimalPipe,private modalService: NgbModal) {
    this.ingredients$ = _ingredientService.ingredients$;
    this.total$ = _ingredientService.total$;
  }

  ngOnInit(){
  }

  openVerticallyCentered({content}: { content: any }) {
    this._ingredientService.getAllIngredientBrand(this.ingredientId).subscribe({
      next:(resp)=> {
        this.ingredientBrands = resp;
      }
    });
    this.modalService.open(content, { centered: true });
  }

  deleteIngType() {
    this._ingredientService.deleteIngType(this.ingredientId);
    this.modalService.dismissAll();
  }

  deleteIng(){
    this._ingredientService.deleteIngBrand(this.ingredientId,this.ingredientBrandId);
    this.modalService.dismissAll();
  }


}
