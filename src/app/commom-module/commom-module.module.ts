import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeletePopUpComponent } from './delete-pop-up/delete-pop-up.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableComponent } from './mat-table/mat-table.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PaginatorComponent } from './paginator/paginator.component';
import { FormsModule,  } from '@angular/forms';



@NgModule({
  declarations: [
    DeletePopUpComponent,
    MatTableComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
   FormsModule,
    
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
    MatSortModule
    
  ],
  exports : [
    MatTableComponent,
    DeletePopUpComponent
  ]
})
export class CommomModuleModule { }
