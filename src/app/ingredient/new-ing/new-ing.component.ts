import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Brand} from "../../model/brand";
import {IngredientService} from "../../service/ingredient.service";
import {IngredientBrand} from "../../model/ingredientBrand";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-new-ing',
  templateUrl: './new-ing.component.html',
  styleUrls: ['./new-ing.component.scss']
})
export class NewIngComponent implements OnInit{
  form!: FormGroup;
  brands:Brand[] = [];
  ingredientBrands:IngredientBrand[] = [];
  ingredientId =0;

  constructor(readonly _ingredientService: IngredientService,private readonly _activatedRoute: ActivatedRoute) {
  }

  onSubmit() {

  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((param)=>{
      this.ingredientId = param['id'];
    })
    this._ingredientService.getAllIngredientBrand(this.ingredientId).subscribe({
      next:(resp)=> {
        this.ingredientBrands = resp;
        this._ingredientService.getBrandAvailable(this.ingredientId).subscribe({
          next: (resp)=> {
            this.brands = resp.filter((b) => {
              const idsBrand = this.ingredientBrands.map(ib => ib.brand.id);
              return !idsBrand.includes(b.id);
            })
          }
        });
      }
    });
    this.form = new FormGroup({
      'brand' : new FormControl('',[Validators.required]),
    });
  }
}
