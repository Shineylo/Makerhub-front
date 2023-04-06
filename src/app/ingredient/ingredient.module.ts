import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil/accueil.component';
import { NewComponent } from './new/new.component';
import { IngredientRoutingModule } from "./ingredient-routing.module";

@NgModule({
  declarations: [
    NewComponent,
  ],
  imports: [
    AccueilComponent,
    CommonModule,
    IngredientRoutingModule
  ]
})
export class IngredientModule { }
