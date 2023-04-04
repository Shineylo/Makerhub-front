import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil/accueil.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterLink} from "@angular/router";
import { NewComponent } from './new/new.component';



@NgModule({
  declarations: [
    AccueilComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink
  ]
})
export class IngredientModule { }
