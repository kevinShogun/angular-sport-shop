import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SportRoutingModule } from './sport-routing.module';
import { SportPageComponent } from './pages/sport-page/sport-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { SportImagePipe } from './pipes/sport-imahe.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogConfirmationComponent } from './components/dialog-confirmation/dialog-confirmation.component';


@NgModule({
  declarations: [
    SportPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    LayoutPageComponent,
    CardComponent,
    SportImagePipe,
    DialogConfirmationComponent
  ],
  imports: [
    CommonModule,
    SportRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SportModule { }
