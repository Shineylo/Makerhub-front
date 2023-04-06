import {DatePipe, DecimalPipe, NgForOf} from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { IngredientService } from "../../service/ingredient.service";

@Component({
  selector: 'ngbd-table-complete',
  standalone: true,
  templateUrl: 'accueil.component.html',
  providers: [DecimalPipe],
  imports: [
    NgForOf,
    DecimalPipe,
    DatePipe
  ]
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
