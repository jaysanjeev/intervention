import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ProblemeComponent } from './probleme/probleme.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProblemeData } from './probleme/probleme-data';
import { TypeproblemeService } from './probleme/typeprobleme.service';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ProblemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule .forRoot(ProblemeData, { delay: 1000 }),
    RouterModule.forRoot([
      {path:'accueil',component:AccueilComponent},
      {path:'probleme',component:ProblemeComponent},
      {path:'**', redirectTo:'accueil',pathMatch:"full"}
    ]),
    ReactiveFormsModule
  ],
  providers: [TypeproblemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
