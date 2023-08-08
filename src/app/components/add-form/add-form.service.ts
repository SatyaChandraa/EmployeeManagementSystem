import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class AddService {

  dataUrl = 'http://localhost:3000/usersList';
  roleUrl = 'http://localhost:3000/roles'
  
  constructor(private http : HttpClient) { }

  addData(newdata : any):Observable<any>{
    return this.http.post(this.dataUrl,newdata);
  }
  updateData(updateData :any,id : number): Observable<any>{
   const updateUrl = `${this.dataUrl}/${id}`;
    return this.http.put(updateUrl,updateData);
  }
  getDataid(id:number):Observable<any> {
    const url = `${this.dataUrl}/${id}`
    return this.http.get<any>(url).pipe(
      catchError( (error : any) => {console.error('Error data is this ' , error); return throwError(error)}
      )
    )
  }
  getRoles():Observable<any>{
    return this.http.get<any>(this.roleUrl);
  }
}
