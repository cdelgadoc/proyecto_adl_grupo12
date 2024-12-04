import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileTableComponent } from './components/file-table/file-table.component';
import { FileViewComponent } from './components/file-view/file-view.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { InfoSidebarComponent } from './components/info-sidebar/info-sidebar.component';
import { EarthAnimationComponent } from './components/earth-animation/earth-animation.component';

import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FileUploadComponent,
    FileTableComponent,
    FileViewComponent,
    InfoSidebarComponent,
    EarthAnimationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
