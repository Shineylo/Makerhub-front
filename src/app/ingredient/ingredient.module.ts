import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { IngredientRoutingModule } from "./ingredient-routing.module";
import { UpdateComponent } from './update/update.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    NewComponent,
    UpdateComponent,
  ],
  imports: [
    HomeComponent,
    CommonModule,
    IngredientRoutingModule,
    ReactiveFormsModule
  ]
})
export class IngredientModule { }
