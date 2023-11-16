import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './reducers/app.reducers';
import { AppEffects } from './effects/app.effects';

import { AppRoutingModule } from './app-routing.module'; 
import { AnalyzeComponent } from './analyze/analyze.component'; 
import { AppComponent } from './app.component';

import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import {SkeletonModule} from 'primeng/skeleton';
import {SidebarModule} from 'primeng/sidebar';

@NgModule({
  declarations: [
    AppComponent,
    AnalyzeComponent
  ],
  imports: [
    BrowserModule,
    CheckboxModule,
    TableModule,
    SidebarModule,
    FormsModule,
    SkeletonModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ app: appReducer }),
    EffectsModule.forRoot([AppEffects])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }