import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';
import { PriceCatcherComponent } from './pricecatcher/pricecatcher.component';
import { PremiseComponent } from './premise/premise.component';

import { DatabaseService } from './database.service';
import { PriceCatcherModalComponent } from './price-catcher-modal/price-catcher-modal.component';
import { PremiseModalComponent } from './premise-modal/premise-modal.component';
import { GroupCategoryFormComponent } from './widgets/group-category-form/group-category-form.component';
import { RegionTreeFormComponent } from './widgets/region-tree-form/region-tree-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    PriceCatcherComponent,
    PremiseComponent,
    PriceCatcherModalComponent,
    GroupCategoryFormComponent,
    RegionTreeFormComponent,
    PremiseModalComponent
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
