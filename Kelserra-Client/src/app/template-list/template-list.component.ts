import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrl: './template-list.component.css'
})
export class TemplateListComponent {

  /**
   * the TemplateList with the start templates (short stories). GUI.001.
   */
  templateList: {templateIndex: number, templateName: string, newTemplate: boolean}[] = [];
  
  // Der Router für die Navigation zwischen den Webpages
  // der Komponenten wird an dieser Stelle initialisiert.
  constructor(private router: Router, private dialog: MatDialog) {  }

  /**
   * the method specifies what happens when the Component is initialized.
     The Start properties of the TemplateList are defined and assigned to the List. GUI.001.
   */
  ngOnInit(): void {         

    this.templateList = [{templateIndex: 1, templateName: "Die Legende von Kelserra", newTemplate: false},
                         {templateIndex: 2, templateName: "Literweise Weltraum-Schrott", newTemplate: false},
                         {templateIndex: 3, templateName: "Der Prediger von Kantiki", newTemplate: false},
                         {templateIndex: 4, templateName: "Drei Mal darfst du raten", newTemplate: false},
                         {templateIndex: 5, templateName: "Neue Stadt neues Glück", newTemplate: false},
                         {templateIndex: 6, templateName: "Ritter Hannes trifft seinen Meister", newTemplate: false},
                         {templateIndex: 7, templateName: "Der Krieger des Westens", newTemplate: false}];
   }


  /**
   * The Click on the row navigates the Webapplication to the 
   * Text-Editor-Component and transmits the name of the template 
   * that was clicked together with the information if it's a new (blank) template. GUI.003.
   * @param templateIndex 
   */
  navigateToTextEditor(templateIndex: number): void {
  
    //console.log('the template is clicked: ', template);

    // The Navigation to the Text-Editor-Component. The name of the template 
    // that has the same name as the clicked List-Element is permitted to the 
    // Text-Editor-Component together with the information if the template is blank as parameters.
      this.router.navigate(["/text-editor", { templateName: this.templateList[templateIndex].templateName, 
                                              newTemplate: this.templateList[templateIndex].newTemplate}]);
             
                                                                  }

  /**
   * With the Click on the Row of the Template List with 
   * the Plus-icon the Dialog is started 
   * to create a new blank Template. GUI.002.
   */
  async createNewTemplate(){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true; //click anywhere in the canvas to close the Dialog.
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      left: '270px'
    }
    dialogConfig.width = "430px";
    dialogConfig.data = {
      id: 1,
      title: 'Name deiner Kurzgeschichte.'
  };

    // 1. get a dialog reference (the object in the constructor of the Dialog-Component).
    // 2. start the dialog. GUI.002.
    const dialog = this.dialog.open(DialogComponent, dialogConfig);

    dialog.afterClosed().subscribe(
      templateName => {console.log("Dialog output:", templateName)
      if(templateName != false){
      
      this.templateList.push({templateIndex: this.templateList.length, templateName: templateName, newTemplate: true});
                                                  }
           }
               );   }}
