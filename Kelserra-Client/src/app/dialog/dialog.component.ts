import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { MatFormField } from '@angular/material/form-field';

import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {


  constructor(private dialogRef: MatDialogRef<DialogComponent>) {


  }

  /**
   * Take the template Name from the input of the user, 
   * give it to the parent component of the DialogComponent (the component that opens the dialog).
   * Approximately at the same time, close the dialog. GUI.002.
   * @param templateName 
   */
  onSubmit(templateName: string) {
    this.dialogRef.close(templateName);}}
