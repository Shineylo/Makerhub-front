import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {NgModule} from "@angular/core";
import {NewComponent} from "./new/new.component";
import {UpdateComponent} from "./update/update.component";
import {DeleteComponent} from "./delete/delete.component";

const routes: Routes = [

  {path: '',children:[
      { path: 'home', component: HomeComponent},
      { path: 'new', component: NewComponent},
      { path: 'update/:id', component: UpdateComponent},
      { path: 'delete/:id', component: DeleteComponent},
    ]}

]

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
})
export class IngredientRoutingModule{
}
