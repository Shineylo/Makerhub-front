import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil/accueil.component';
import { HttpClientModule } from "@angular/common/http";
import { NewComponent } from './new/new.component';
import { CardComponent } from './accueil/card/card.component';
import { IngredientRoutingModule } from "./ingredient-routing.module";



@NgModule({
  declarations: [
    AccueilComponent,
    NewComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    IngredientRoutingModule
  ]
})
export class IngredientModule { }
