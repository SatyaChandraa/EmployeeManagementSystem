import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class RolesService {

  roleUrl = 'http://localhost:3000/roles'

  constructor(private http : HttpClient) { }

  updateRoles(uData : any, id: number){
    const url = `${this.roleUrl}/${id}`;
    return this.http.put(url,uData);
  }
  addRole(aData:any):Observable<any>{
    return this.http.post(this.roleUrl,aData)
  }
  getRoles():Observable<any>{
    return this.http.get<any>(this.roleUrl);
  }
  deleteRole(id:number):any{
    const url = `${this.roleUrl}/${id}`
    return this.http.delete(url);
  }

  getDataWithPagination(page: number, limit: number) {
    const apiUrl = 'http://localhost:3000/roles';
    const httpOptions = {
      headers: new HttpHeaders({
       // 'Content-Type': 'application/json',
      }),
      params: new HttpParams().set('_limit', limit.toString()).set('_page', page.toString()),
      observe: 'response' as const
    };
  
   return this.http.get<any[]>(apiUrl, httpOptions)
  }
  filterValue(searchValue:any)  {
          const  url =`http://localhost:3000/roles?q=${searchValue}`;
          return this.http.get(url)
     }
}
