import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';
import { PriceCatcherComponent } from './pricecatcher/pricecatcher.component';
import { PremiseComponent } from './premise/premise.component';

import { DatabaseService } from './database.service';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    PriceCatcherComponent,
    PremiseComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: PopupComponent },
      { path: 'pricecatcher', component: PriceCatcherComponent },
      { path: 'premise', component: PremiseComponent },
    ], { useHash: true })
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
