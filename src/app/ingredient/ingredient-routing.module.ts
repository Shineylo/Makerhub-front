import {RouterModule, Routes} from "@angular/router";
import {AccueilComponent} from "./accueil/accueil.component";
import {NgModule} from "@angular/core";

const routes: Routes = [

  { path: 'accueil', component: AccueilComponent},

]

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
})
export class IngredientRoutingModule{
}
