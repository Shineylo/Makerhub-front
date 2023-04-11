import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { IngredientRoutingModule } from "./ingredient-routing.module";
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [
    NewComponent,
    DeleteComponent,
    UpdateComponent,
  ],
  imports: [
    HomeComponent,
    CommonModule,
    IngredientRoutingModule
  ]
})
export class IngredientModule { }
