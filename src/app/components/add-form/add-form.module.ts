import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';


import { AddForm } from './add-form';

import { AddService } from './add-form.service';
import { HttpClientModule } from '@angular/common/http';
import { AddFormRoutingModule } from './add-form-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddForm
  ],
  imports: [
    AddFormRoutingModule,
    CommonModule,

    //ComponentsModule,
    HttpClientModule,

    
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    MatProgressSpinnerModule,

    FormsModule,
    ReactiveFormsModule,

   // CommomModuleModule
  
  ],
  providers:[
    AddService,
    DatePipe
  ]
})
export class AddFormModule { }
