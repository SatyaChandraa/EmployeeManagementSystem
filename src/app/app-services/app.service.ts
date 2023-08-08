import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // constructor(private http : HttpClient) { }
  // getData(): any{
  //   return this.http.get<any>(this.dataUrl);
  // }
  // delete(id:number):any{
  //   const url = `${this.dataUrl}/${id}`
  //   return this.http.delete(url);
  // }
  // addData(newdata : any):Observable<any>{
  //   return this.http.post(this.dataUrl,newdata);
  // }
  // updateData(updateData :any,id : number): Observable<any>{
  //  const updateUrl = `${this.dataUrl}/${id}`;
  //   return this.http.put(updateUrl,updateData);
  // }
  // updateRoles(uData : any, id: number){
  //   const url = `${this.roleUrl}/${id}`;
  //   return this.http.put(url,uData);
  // }

  // addRole(aData:any):Observable<any>{

  //   return this.http.post(this.roleUrl,aData)
  // }

  // getRoles():Observable<any>{
  //   return this.http.get<any>(this.roleUrl);
  // }
  // deleteRole(id:number):any{
  //   const url = `${this.roleUrl}/${id}`
  //   return this.http.delete(url);
  // }
  // getDataid(id:number):Observable<any> {
  //   const url = `${this.dataUrl}/${id}`
  //   return this.http.get<any>(url).pipe(
  //     catchError( (error : any) => {console.error('Error data is this ' , error); return throwError(error)}
  //     )
  //   )
  // }
  
 


}
