import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import {AppRoutingModule} from "./app-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";

import {DecimalPipe, registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { SorttableDirective } from './directive/sorttable.directive';
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    SorttableDirective,
  ],
  providers: [
    {provide: localeFr, useValue: 'fr'} ,
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
