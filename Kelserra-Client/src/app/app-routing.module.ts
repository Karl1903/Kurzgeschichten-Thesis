import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateListComponent } from './template-list/template-list.component';
import { TextEditorComponent } from './text-editor/text-editor.component';

// The routes that the webapplication
// contains for the different components and its webpages.
const routes: Routes = [ 
      { path: "template-list", component: TemplateListComponent },
      {path: "text-editor", component: TextEditorComponent},
      { path: "", redirectTo: "/template-list", pathMatch: "full" }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
