import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';
import { MainComponent } from './main/main.component';
import { PremiseComponent } from './premise/premise.component';

import { DatabaseService } from './database.service';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    MainComponent,
    PremiseComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: PopupComponent },
      { path: 'main', component: MainComponent },
      { path: 'premise', component: PremiseComponent },
    ], { useHash: true })
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
