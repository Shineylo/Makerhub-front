import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {NgModule} from "@angular/core";
import {NewIngTypeComponent} from "./new-ing-type/new-ing-type.component";
import {NewIngComponent} from "./new-ing/new-ing.component";

const routes: Routes = [

  {path: '',children:[
      { path: 'home', component: HomeComponent},
      { path: 'newIngType', component: NewIngTypeComponent},
      { path: ':id/newIng', component:NewIngComponent}
    ]}

]

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
})
export class IngredientRoutingModule{
}
