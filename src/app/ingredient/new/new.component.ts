import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {IngredientService} from "../../service/ingredient.service";
import {Brand} from "../../model/brand";
import {UnitOfMeasure} from "../../model/unitOfMeasure";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {
  form!: FormGroup;
  brands:Brand[] = [];
  unitOfMeasures:UnitOfMeasure[] = []

  constructor(private readonly _ingredientService: IngredientService) {
  }

  ngOnInit(){

    this.form = new FormGroup({
      'name' : new FormControl(''),
      'price' : new FormControl(''),
      'quantity' : new FormControl(''),
      'expiration' : new FormControl(''),
      'unitOfMeasureId' : new FormControl(''),
      'brandId': new FormControl('')
    });
    this._ingredientService.getAllBrand().subscribe({
      next: (resp)=> this.brands = resp
    })
    this._ingredientService.getAllUOfM().subscribe({
      next: (resp)=> this.unitOfMeasures = resp
    })
  }

  onSubmit() {

  }
}
