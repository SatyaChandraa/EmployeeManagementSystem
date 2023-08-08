import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddForm } from './add-form';

const routes: Routes = [{ path: '', component: AddForm }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddFormRoutingModule { }
