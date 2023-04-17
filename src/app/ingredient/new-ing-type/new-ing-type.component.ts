import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {IngredientService} from "../../service/ingredient.service";
import {UnitOfMeasure} from "../../model/unitOfMeasure";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new',
  templateUrl: './new-ing-type.component.html',
  styleUrls: ['./new-ing-type.component.scss']
})
export class NewIngTypeComponent implements OnInit{
  form!: FormGroup;
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
