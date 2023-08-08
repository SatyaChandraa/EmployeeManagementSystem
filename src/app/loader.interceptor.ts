import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { EmployeeListService } from './components/employee-list/employee-list.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private employeeListService: EmployeeListService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>>  {
    console.log('Entering Interceptor');

    this.employeeListService.isLoading=true;
    console.log( this.employeeListService.isLoading);
    
    return next.handle(request).pipe(
      tap(
        (event:any) => {
          if (event instanceof HttpResponse) {
            console.log('Intercepting response:', event);
            // setTimeout(() => {
            //   this.employeeListService.isLoading=false;
            // }, 1000);

          this.employeeListService.isLoading=false;

           console.log( this.employeeListService.isLoading);
          }
        },
        (error) => {
          console.log('Intercepting error:', error);
          this.employeeListService.isLoading=true;
        }
      )
    )
  }
}
