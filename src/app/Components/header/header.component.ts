import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  getTitle() {
    let location = window.location.pathname;
    let page = "";
    if(location.charAt(0) === "/")
      location = location.substring(1);
    let pagesplit = location.split("/");
    for (const elem in pagesplit) {
      switch (pagesplit[elem]) {
        case "ingredient":
          pagesplit[elem] = "Ingrédient"
          break;
        case "accueil":
          pagesplit[elem] = "Accueil"
          break;
        case "new":
          pagesplit[elem] = "Création"
          break;
      }
    }
    for (let i = 0; i < pagesplit.length; i++) {
      page = page.concat(pagesplit[i]+ " ")
    }
    return page;
  }



}
