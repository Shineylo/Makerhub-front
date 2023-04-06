import { Component,OnInit } from '@angular/core';
import {IngredientService} from "../../service/ingredient.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit{
  ingredients:any[] = [];

  constructor(private readonly _ingredientService: IngredientService) {
  }
  ngOnInit(){
    this._ingredientService.getAll().subscribe({
      next: (resp =>this.ingredients = resp)
    })
  }
}
