import {RouterModule, Routes} from "@angular/router";
import {AccueilComponent} from "./accueil/accueil.component";
import {NgModule} from "@angular/core";
import {NewComponent} from "./new/new.component";

const routes: Routes = [

  {path: '',children:[
      { path: 'accueil', component: AccueilComponent},
      { path: 'new', component: NewComponent},

    ]}

]

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
})
export class IngredientRoutingModule{
}
