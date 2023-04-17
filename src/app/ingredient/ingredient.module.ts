import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NewIngTypeComponent } from './new-ing-type/new-ing-type.component';
import { IngredientRoutingModule } from "./ingredient-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import { NewIngComponent } from './new-ing/new-ing.component';

@NgModule({
  declarations: [
    NewIngTypeComponent,
    NewIngComponent,
  ],
  imports: [
    HomeComponent,
    CommonModule,
    IngredientRoutingModule,
    ReactiveFormsModule
  ]
})
export class IngredientModule { }
