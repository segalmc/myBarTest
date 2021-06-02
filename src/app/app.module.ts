import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StakedBarComponent } from './staked-bar/staked-bar.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { BarsGridComponent } from './bars-grid/bars-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    StakedBarComponent,
    BarsGridComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
