import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {ProductRoutingModule} from "./product-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbHighlight, NgbPagination} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        FormsModule,
        NgbHighlight,
        NgbPagination,
        ReactiveFormsModule,
    ]
})
export class ProductModule { }
