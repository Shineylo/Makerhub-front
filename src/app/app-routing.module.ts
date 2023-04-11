import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./Components/home/home.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'ingredient', loadChildren: () => import('./ingredient/ingredient.module').then( m => m.IngredientModule ) },
  { path: 'product', loadChildren: () => import('./product/product.module').then( m => m.ProductModule ) },
  { path: 'order', loadChildren: () => import('./order/order.module').then( m => m.OrderModule ) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
