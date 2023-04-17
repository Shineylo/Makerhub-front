import {AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe, NgFor, NgIf} from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import { IngredientService } from "../../service/ingredient.service";
import { RouterLink } from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbHighlight, NgbModal, NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import { Observable} from "rxjs";
import { Ingredient } from "../../model/ingredient";
import {IngredientBrand} from "../../model/ingredientBrand";
import {Brand} from "../../model/brand";

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
  ingredientBrands:IngredientBrand[] = [];
  formBrand!: FormGroup;
  brands:Brand[] = [];

  constructor(readonly _ingredientService: IngredientService, pipe: DecimalPipe,private modalService: NgbModal) {
    this.ingredients$ = _ingredientService.ingredients$;
    this.total$ = _ingredientService.total$;
  }

  ngOnInit(){
    this.formBrand = new FormGroup({
      'brand' : new FormControl(''),
    });
  }

  openVerticallyCentered({content}: { content: any }) {
    this._ingredientService.getAllIngredientBrand(this.ingredientId).subscribe({
      next:(resp)=> this.ingredientBrands = resp
    });
    this._ingredientService.getBrandAvailable(this.ingredientId).subscribe({
      next: (resp)=> {
        this.brands = resp.filter((b) => {
          const idsBrand = this.ingredientBrands.map(ib => ib.brand.id)
          return !idsBrand.includes(b.id)
        })
      }
    })
    this.modalService.open(content, { centered: true });
  }

  delete() {
    this._ingredientService.delete(this.ingredientId);
    this.modalService.dismissAll();
  }

  onSubmitBrand() {
    if(this.formBrand.valid) {
      if(this.formBrand.value.brand == "Créer une marque"){

      }
    }
  }
}
