import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./Components/home/home.component";
import {LoggedInGuard} from "./guards/logged-in.guard";

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard]},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )},
  { path: 'ingredient', loadChildren: () => import('./ingredient/ingredient.module').then( m => m.IngredientModule ), canActivate: [LoggedInGuard]},
  { path: 'product', loadChildren: () => import('./product/product.module').then( m => m.ProductModule ), canActivate: [LoggedInGuard]},
  { path: 'order', loadChildren: () => import('./order/order.module').then( m => m.OrderModule ), canActivate: [LoggedInGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
