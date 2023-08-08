import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesService } from './roles.service';
import { RolesComponent } from './roles.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommomModuleModule } from 'src/app/commom-module/commom-module.module';


@NgModule({
  declarations: [
    RolesComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,

    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,
    MatProgressSpinnerModule,
    CommomModuleModule
  ],
  providers:[
    RolesService
  ]
})
export class RolesModule {}
