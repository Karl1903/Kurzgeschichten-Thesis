import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateListComponent } from './template-list/template-list.component';
import { TextEditorComponent } from './text-editor/text-editor.component';

import {ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes } from '@angular/router';
import {HttpClientModule } from '@angular/common/http';

import { DialogComponent } from './dialog/dialog.component';

import { MatDialogModule } from "@angular/material/dialog";

import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'


// the routes for the navigation from one component
// to another get setup at this point.
const routes: Routes = [
  { path: 'template-list', component: TemplateListComponent },
  { path: 'text-editor', component: TextEditorComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TemplateListComponent,
    TextEditorComponent,
    
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
