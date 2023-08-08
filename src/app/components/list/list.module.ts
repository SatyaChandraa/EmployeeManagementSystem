import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { RolesService } from '../roles/roles.service';
import { HttpClientModule } from '@angular/common/http';
import { CommomModuleModule } from 'src/app/commom-module/commom-module.module';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,

    HttpClientModule,
    CommomModuleModule
  ],
  providers:[
    RolesService
  ]
})
export class ListModule { }
