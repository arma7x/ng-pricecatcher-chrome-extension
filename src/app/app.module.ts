import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';
import { PriceCatcherComponent } from './pricecatcher/pricecatcher.component';
import { PremiseComponent } from './premise/premise.component';

import { DatabaseService } from './database.service';
import { GroupCategoryFormComponent } from './group-category-form/group-category-form.component';
import { PriceCatcherModalComponent } from './price-catcher-modal/price-catcher-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    PriceCatcherComponent,
    PremiseComponent,
    GroupCategoryFormComponent,
    PriceCatcherModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: PopupComponent },
      { path: 'pricecatcher', component: PriceCatcherComponent },
      { path: 'premise', component: PremiseComponent },
    ], { useHash: true }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
