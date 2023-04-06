import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  constructor(
    private readonly _httpClient: HttpClient,
  ) { }

  getAll(){
    return this._httpClient.get<any[]>('http://localhost:8080/api/ingredient/all').pipe(
      catchError((error) => {
        return throwError(() => new Error("ERREUR"))
      })
    )
  }

  create(form: any){
    return this._httpClient.post<any>('http://localhost:8080/api/ingredient/new',form).pipe();
  }
}
