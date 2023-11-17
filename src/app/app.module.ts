import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './reducers/app.reducers';
import { AppEffects } from './effects/app.effects';

import { AppRoutingModule } from './app-routing.module'; 
import { AnalyzeComponent } from './analyze/analyze.component'; 
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import {SkeletonModule} from 'primeng/skeleton';
import {SidebarModule} from 'primeng/sidebar';
import { FileUploadModule } from 'primeng/fileupload';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips'
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';

import { SecondsToHmsPipe } from './pipes/hmsPipe';

@NgModule({
  declarations: [
    AppComponent,
    SecondsToHmsPipe,
    AnalyzeComponent
  ],
  imports: [
    BrowserModule,
    CardModule,
    CheckboxModule,
    FileUploadModule,
    TableModule,
    SidebarModule,
    ChipsModule,
    FormsModule,
    InputTextareaModule,
    DropdownModule,
    SkeletonModule,
    MenubarModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
      MatButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ app: appReducer }),
    EffectsModule.forRoot([AppEffects])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }