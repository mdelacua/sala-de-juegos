import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartasService {
 

  constructor(private http: HttpClient) { }


  //crear mazo https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,2S,3S,4S,5S,6S,7S,8S,9S,0S
  //obtener carta https://deckofcardsapi.com/api/deck/deck_id/draw/?count=1
  
  TraerMazo(){
    return this.http.get('https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,2S,3S,4S,5S,6S,7S,8S,9S,0S');
    
   }
  TraerCarta(mazoId:string){
    return this.http.get('https://deckofcardsapi.com/api/deck/'+mazoId+'/draw/?count=1');
    
   }
}
