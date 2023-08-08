import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeListRoutingModule } from './employee-list-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListService } from './employee-list.service';
import { EmployeeList } from './employee-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommomModuleModule } from 'src/app/commom-module/commom-module.module';


@NgModule({
  declarations: [
   EmployeeList
  ],
  imports: [
    EmployeeListRoutingModule,
    CommonModule,
    
    HttpClientModule,
    MatProgressSpinnerModule,
    CommomModuleModule
   //ComponentsModule
  ],
  providers: [
    HttpClientModule
  ]
})
export class EmployeeListModule { }
