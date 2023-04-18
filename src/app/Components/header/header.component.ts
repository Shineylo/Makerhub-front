import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  anyUserConnected?: boolean;

  constructor(private readonly _loginService: LoginService, private readonly _router : Router){
    this._loginService.connected$.subscribe(user => this.anyUserConnected = user)
  }

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
        case "home":
          pagesplit[elem] = "Accueil"
          break;
        case "new":
          pagesplit[elem] = "Création"
          break;
        case "product":
          pagesplit[elem] = "Produit"
          break;
        case "order":
          pagesplit[elem] = "Commande"
          break;
        case "update":
          pagesplit[elem] = "Modifier"
          break;
        case "delete":
          pagesplit[elem] = "Supprimer"
          break;
      }
    }
    for (let i = 0; i < pagesplit.length; i++) {
      page = page.concat(pagesplit[i]+ " ")
    }
    return page;
  }


  deconnection() {
    this._loginService.logout();
  }
}
