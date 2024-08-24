
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TextToPictureService {

  constructor(private http:HttpClient) { }

/**
 * HTTP-Get-Call to the OpenAI DallE Text-To-Picture-Generator.
 * @param textPrompt
 * @returns 
 */
getPicturefromTextwithDallE(textPrompt:string): Observable<any>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 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'
  });
  const data = {
    prompt: textPrompt,
    n: 1,
    size: '1024x1024'
  };

 return this.http.post('https://api.openai.com/v1/images/generations', data, { headers })
    .pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error; // Rethrow the error to propagate it to the component
      })
    ); }


    /**
     * HTTP-Post-Call to the Leonardo.AI 
     * Text-To-Picture-Generator to create pictures with the text prompt. GUI.005.
     * @param textPrompt
     * @returns 
     */
    createPicturesfromTextwithLeonardoAI(textPrompt:string): Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': 'Bearer 6a1e44ec-fdbe-4cef-8971-91ab87229780'
      });
      const data = {
        prompt: "Farbiger Concept-Art-Stil mit scharfer Grafik: " + textPrompt,
        //modelId: "123123123",
        height: 512,
        width: 512
      };
    
     return this.http.post('https://cloud.leonardo.ai/api/rest/v1/generations', data, { headers })
        .pipe(
          catchError((error) => {
            console.error('Error:', error);
            throw error; // Rethrow the error to propagate it to the component
          })
        ); }
      
       
     /**
      * HTTP-Get-Call to retrieve the generated pictures with the ID. GUI.005.
      * @param pictureID
      * @returns 
      */
     getCreatedPicturesFromLeonardoAI(pictureID: string): Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': 'Bearer 6a1e44ec-fdbe-4cef-8971-91ab87229780'
      });

     return this.http.get('https://cloud.leonardo.ai/api/rest/v1/generations/' + pictureID, { headers })
        .pipe(
          catchError((error) => {
            console.error('Error:', error);
            throw error; // Rethrow the error to propagate it to the component
                                                    }));}}