import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListService {

  isLoading : boolean = false;
  dataUrl = 'http://localhost:3000/usersList';
 // dataUrl= 'http://localhost:3000/usersList?_limit=7_page=1'
  constructor(private http : HttpClient) { }

  getData(): any{
    return this.http.get<any>(this.dataUrl);
  }

  delete(id:number):any{
    const url = `${this.dataUrl}/${id}`
    return this.http.delete(url);
  }

  // fetchData(pageIndex: number, pageSize: number): any {
  //   console.log(pageIndex,pageSize);
  //   const url = `http://localhost:3000/usersList?_limit=${pageSize}&_page=${pageIndex + 1}`;
  //   return this.http.get<any>(url,{observe : 'response'})
  // }

  getDataWithPagination(page: number, limit: number) {
    const apiUrl = 'http://localhost:3000/usersList';
   // const url = `http://localhost:3000/usersList?_limit=${page}&_page=${page + 1}`;
    const httpOptions = {
      headers: new HttpHeaders({
       // 'Content-Type': 'application/json',
      }),
      params: new HttpParams().set('_limit', limit.toString()).set('_page', page.toString()),
      observe: 'response' as const
    };
  
   return this.http.get<any[]>(apiUrl, httpOptions)
  }

  filterValue(searchValue:any)
    {
        const  url =` http://localhost:3000/usersList?q=${searchValue}`;
        return this.http.get(url)
    }

   sortedData(active:string,direction:string,limit:number,page:number)
   {
    console.log(active);
    console.log(direction); 
   const url = `http://localhost:3000/usersList?_sort=${active}&_order=${direction}`;
      //  const url = `http://localhost:3000/usersList?_sort=${active}&_order=${direction}&_limit=${limit}&_page=${page+1}`;
      // const url = `http://localhost:3000/usersList?_sort=${active}&_order=${direction}&_limit=${limit}`;
      //  const url = `http://localhost:3000/usersList?_sort=${active}&_order=${direction}&_page=${page+1}`;

    return this.http.get(url)
   }

}
