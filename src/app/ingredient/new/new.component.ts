import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {IngredientService} from "../../service/ingredient.service";
import {Brand} from "../../model/brand";
import {UnitOfMeasure} from "../../model/unitOfMeasure";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {
  form!: FormGroup;
  brands:Brand[] = [];
  unitOfMeasures:UnitOfMeasure[] = []

  constructor(private readonly _ingredientService: IngredientService,private readonly _router : Router) {
  }

  ngOnInit(){

    this.form = new FormGroup({
      'name' : new FormControl(''),
      'unitOfMeasureId' : new FormControl(''),
    });
    this._ingredientService.getAllUOfM().subscribe({
      next: (resp)=> this.unitOfMeasures = resp
    })
  }

  onSubmit() {
    console.log(this.form.value);
    if( this.form.valid ) {
      const data = {
        ...this.form.value
      }
      this._ingredientService.create(data).subscribe({
        next:value => this._router.navigateByUrl("ingredient/home")
      })
    }
  }
}
