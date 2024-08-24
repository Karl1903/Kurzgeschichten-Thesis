

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { HttpClient } from '@angular/common/http';

import { Router } from "@angular/router";
import { TextToPictureService } from "../text-to-picture.service";
import { timer } from 'rxjs';


@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.css'
})

export class TextEditorComponent implements OnInit {

  templateName: string = '';

  /**  The text fields that the user can edit and write his short stories into.
       Text fields have got different properties to control the workflow of the user interaction. */
  textfields: {
    text: string; // Text property. GUI.004.
    editMode: boolean; // property to keep track if the text field is in edit mode or not. GUI.004.
    editModeForbidden: boolean; // property to lock the textFields that the Developer provides to the User as Inspiration for Creative Writing. GUI.004.
    pictureID: string; // Picture creation ID. GUI.005.
    pictureURLs: string[]; // Picture URLs. For 1 textfield 4 pictures get created with the HTTP-Call to the Leonardo.AI-API. GUI.005.
    picturesLoading: boolean; //Needed to check if the user needs to get shown the Loading Animation. GUI.005.
    picturesCreated: boolean; // Needed to check if the user needs to get shown the "Bilder generieren."-Button. GUI.005.
    pictureSelector: number; //Needed to let the user cycle through the 4 different pictures. GUI.005.
    lastField: boolean; //Needed to decide wether to render the create-text-field-button (Needed just at the bottom for the last Text Field.). GUI.004.
    grammarCheckOn: boolean}[] = []; // spell check flag. GUI.006.

  textForm: FormGroup;

  /**  Variable to track the active textfield.
   Needed to reassure that only one textfield is in edit mode at a given point in time. GUI.004.*/
  activeTextfieldIndex: number | null = null;

  /** Text of the Button with that the user can turn on/off the grammar test. GUI.006. */
  grammatikButtonText: string = "Grammatik-Test einschalten.";


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private textToPictureService: TextToPictureService) {
    this.textForm = this.fb.group({
      // Text fields should have a maximum of 333 Characters,
      //so the prompt to be sent to the Text-to-Picture-Generator
      // doesnt get too long and therefore has
      // a higher chance to be precise and produce good results. GUI.004.
      textContent: ['', Validators.maxLength(333)],
    });
  }

  //this method specifies what happens when the Component is initialized.
  ngOnInit(): void {
    // The name of the template that was sent at the point in time when
    // the navigation from the template-list-component
    // to the text-editor-component happened,
    // is retrieved from the Router-Parameters. GUI.003.
    this.templateName = this.route.snapshot.paramMap.get('templateName') || '';

    // The information true/false if the Template has content yet (false ---> not a new Template),
    // or if it is a new blank Template created by the User (true ---> new Template, no content till this point in time). GUI.003.
    const newTemplate = this.route.snapshot.paramMap.get('newTemplate') || '';

    //console.log("template Name: " + this.templateName)

    //the Local Text-File that has the same name as the Template clicked by the user gets read.
    //Text Segments from the Text File get pushed into the Text-Fields-Array of the Text-Editor-Component. GUI.004.
    const templateFileLocation = `../../assets/Templates/${this.templateName.replace(/\s/g, "")}/text/text-segments.txt`
    //console.log(`../../assets/Templates/${this.templateName.replace(/\s/g, "")}/text/text-segments.txt`);
    //console.log(newTemplate);
    if (newTemplate == "false") {

      this.httpClient
        .get(templateFileLocation, { responseType: 'text' })
        .subscribe((data) => {
          //console.log(data);
          const templateSegments = data.split('\r\n');
          //console.log(`../../assets/Templates/${this.templateName}/Picture/${templateSegments.length}.jpg`);
          //console.log(templateSegments)
          for (let c = 0; c <= templateSegments.length - 2; c++) {
            //const words = templateSegments[c].split(' ');
            //const grammarFlags = words.map(() => false); // Initialize all words as grammatically correct.

            //console.log(`../../assets/Templates/${this.templateName.replace(/\s/g, "")}/pictures/${c+1}.jpg`);
            this.textfields.push({
              text: `${c + 1}. ${templateSegments[c]}`,
              editMode: false,
              editModeForbidden: true,
              pictureID: "",
              pictureURLs: [`../../assets/Templates/${this.templateName.replace(/\s/g, "")}/pictures/${c+1}.jpg`],
              picturesLoading: false,
              picturesCreated: true,
              pictureSelector: 0,
              lastField: false,
              grammarCheckOn: false
            });
          }
          
          //Dont forbid editing the last textField of the template if it is not the Legend of Kelserra.
          //The Legend of Kelserra explains the story of the Webapplication and isn't meant to be edited. GUI.004.
          if(this.templateName !== "Die Legende von Kelserra"){
          this.textfields.push({
            text: templateSegments[templateSegments.length-1],
            editMode: false,
            editModeForbidden: false,
            pictureID: "",
            pictureURLs: [`../../assets/Templates/${this.templateName.replace(/\s/g, "")}/pictures/${templateSegments.length}.jpg`],
            picturesLoading: false,
            picturesCreated: true,
            pictureSelector: 0,
            lastField: true,
            grammarCheckOn: false});

          } else {
            //The Last Field in the Legend of Kelserra.
            this.textfields[templateSegments.length-2].lastField = true;}
          //console.log(this.textfields[templateSegments.length].editModeForbidden)
        });

      //Case: The user created a new blank Template.
    } else if (newTemplate == "true") {
      this.textfields.push({
        text: "Starte deine Kurzgeschichte hier.",
        editMode: false,
        editModeForbidden: false,
        pictureID: "",
        pictureURLs: [],
        picturesLoading: false,
        picturesCreated: false,
        pictureSelector: 0,
        lastField: true,
        grammarCheckOn: false
      });
    }
  }

  /**
   * The method puts the textfield that is connected to the button clicked into
   * the edit-mode, so that the text of the textfield can be extended, deleted etc. GUI.004.
   * @param index 
    */
  startEditMode(index: number): void {
    // Only allow 1 single textfield to be in edit mode at a given point in time.
    if (this.activeTextfieldIndex !== null) {
      this.textfields[this.activeTextfieldIndex].editMode = false;
    }
    this.textfields[index].editMode = true;
    this.activeTextfieldIndex = index;
    // Set the initial value of the textContent form control to the corresponding textfield value.
    const textContentControl = this.textForm.get('textContent');
    if (textContentControl) {
      textContentControl.setValue(this.textfields[index].text);
    }
  }

  /**
   * The method stops the edit mode for the Text field that is connected to the button clicked (with index c).
   * That means that the static part of the Textfield gets displayed and the dynamic part gets hidden. GUI.004.
   * @param index 
   */
  stopEditMode(index: number): void {
    this.textfields[index].editMode = false;
    this.activeTextfieldIndex = null;
  }


  /**
   * 1. The method updates the value of property "text" of the textfield that is in edit-mode at the time 
   *    the check-mark-button gets clicked (see HTML-Layout: class "save-button"). (GUI.004).
   * 2. Calls the method stopEditMode. (GUI.004).
   * @param index 
   */
  saveTextField(index: number): void {
    const textContentControl = this.textForm.get('textContent');
    //Reassure that "textContent" was not null.
    if (textContentControl) {
      const newText = textContentControl.value;
      if (textContentControl.value != this.textfields[index].text) {
        this.textfields[index].text = newText;

        this.textForm.reset();
        //set this.picturesForTextfieldCreated to false, so the "Bild generieren"-button 
        //gets rendered for this textfield.
        //Do this just in case the user changed the text-content of the field,
        //so he might want to create a new picture for the new text she wrote. GUI.004, GUI.005.
        this.textfields[index].picturesCreated = false;
      }
    }
    this.stopEditMode(index);
  }


  /**
   * Returns true if any text field is currently in edit mode. GUI.004.
   * @returns
   */
  anyTextFieldInEditMode(): boolean {


    return this.textfields.some(field => field.editMode);
  }


  /**
   * 1. The current Text from the corresponding textfield gets sent to the Service
   *    of the Text-to-Picture-Generator with the HTTP-Post-Request.
   * 2. The Picture-Generation takes some time, that's the reason that the Server
   *    returns an ID at first.
   * 3. After that the thread is put to sleep for some time,
   *    then the retrieved ID gets inserted into a second HTTP-Get-Request that gets 
   *    sent to the Text-to-Picture-Generator.
   *    The Text-to-Picture-Service returns the 4 pictures created that are connected to that ID.
   * 4. Finally, the Links to the 4 pictures get inserted in the textfields array, which is
   *    connected to the the HTML-Layout via Input-Binding (class: created-picture. HTML-Attribute: src). GUI.005.
   * @param index 
   */
  createPicturesFromText(index: number): void {

    //debugger
    //text of the corresponding text field.
    const textPrompt = this.textfields[index].text;

    console.log(textPrompt)
    // HTTP-Post-Call to the text-to-picture-Service.
    this.textToPictureService.createPicturesfromTextwithLeonardoAI(textPrompt).subscribe(data => {

      //The LeonardoAI-API returns a ID for the generated Picture.
      this.textfields[index].pictureID = data.sdGenerationJob.generationId;
      console.log(this.textfields[index].pictureID)

      //create a boolean to let the user see that the pictures get loaded with an animation.
      this.textfields[index].picturesLoading = true;

      //set this boolean to true, so the "Bild generieren"-button doesn't get rendered for this textfield.
      this.textfields[index].picturesCreated = true;

      // delay of 13 seconds, cause the creation of the pictures needs a bit time.
      this.sleep(13000).subscribe(() => {

        //The created Picture can be fetched with the ID.
        this.textToPictureService.getCreatedPicturesFromLeonardoAI(this.textfields[index].pictureID).subscribe(response => {
          // the picture gets inserted into the thextFields array.
          //data.data[0].url
          //console.log(response.generations_by_pk.generated_images[1].url)
          this.textfields[index].picturesLoading = false
          //const pictureUrl = URL.createObjectURL(response.generations_by_pk.generated_images[1].url);
          for (let i = 0; i <= response.generations_by_pk.generated_images.length; i++) {
            console.log(response.generations_by_pk.generated_images[i]);
            this.textfields[index].pictureURLs[i] = response.generations_by_pk.generated_images[i].url;
          } // Updates the generatedPicture property.

        });
      });
      //DallE: data.data[0].url
      //consumerPollProducersForChange
    });
  }


  /**
   * the method navigates the Client to the Template-List-Component (Main Menu). (GUI.007).
   */
  navigateToTemplateList(): void {

    //console.log("what")
    // The Navigation to the Template-List-Component.
    this.router.navigate(["/template-list"]);
  }


  /**
   * The spellcheck-Attribut has got a property binding to the field.grammarCheckOn boolean.
   * If the user clicks the button to turn on the Grammar Check the boolean is set to true.
   * At the same time the button is transformed to turn off the Grammar Check 
   * with the next click which then sets the field.grammarCheckOn to false. GUI.006.
   * @param index 
   */
  checkGrammar(index: number): void {
    if (this.textfields[index].grammarCheckOn) {
      this.textfields[index].grammarCheckOn = false;
      this.grammatikButtonText = "Grammatik-Test einschalten.";
    } else if (this.textfields[index].grammarCheckOn === false) {
      this.textfields[index].grammarCheckOn = true;
      this.grammatikButtonText = "Grammatik-Test abschalten.";
    }
  }
  //const text = this.textfields[index].text;
  //const words = text.split(' ');

  // Perform grammar check logic for each word.
  //const updatedGrammarFlags = words.map(word => isGrammaticallyIncorrect(word));

  // Update the grammarFlags array for the corresponding text field.
  //this.textFields[index].grammarFlags = updatedGrammarFlags;


  /**
   * make the thread sleep. Returns the observable timer that emits the number
   *  0 as the notification after having waited for the duration to pass. GUI.005.
   * @param duration 
   * @returns 
   *                     
   */
  sleep(duration: number) {
    return timer(duration);
  }

  /**
   * The method to increment the pictureSelector and cycle through values 0, 1, 2, 3.
   * The method gets called when the user clicks the arrow-button to show a different picture.
   * There are 4 pictures provided for each textField, if the user finished the picture creation process. GUI.005.
   * @param index 
   */
  incrementPictureSelector(index: number) {
    this.textfields[index].pictureSelector = (this.textfields[index].pictureSelector + 1) % 4;
  }


  /**
   * Create textfield after the current last textfield. GUI.004.
   */
  createTextField() {
    this.textfields.push({
      text: "",
      editMode: false,
      editModeForbidden: false,
      pictureID: "",
      pictureURLs: [],
      picturesLoading: false,
      picturesCreated: false,
      pictureSelector: 0,
      lastField: true,
      grammarCheckOn: false
    });

    this.textfields[this.textfields.length - 2].lastField = false;
  }

}

