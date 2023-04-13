import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {ProductRoutingModule} from "./product-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbHighlight, NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {SorttableDirective} from "../directive/sorttable.directive";



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
        SorttableDirective
    ]
})
export class ProductModule { }
