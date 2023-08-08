import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [

    {
      path : 'home', 
       loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
     //component : HomeComponent
    },
    {
      path: 'employee-list' ,
      loadChildren: () => import('./components/employee-list/employee-list.module').then(m => m.EmployeeListModule)
     // component:EmployeeList
    },
    {
      path: 'employee-form' , 
       loadChildren: () => import('./components/add-form/add-form.module').then(m => m.AddFormModule)
      //component:EmployeForm
    },
    {
      path: 'employee-form/:id' ,
         loadChildren: () => import('./components/add-form/add-form.module').then(m => m.AddFormModule)
     // component:EmployeForm
    },
    {
      path : 'roles',
         loadChildren: () => import('./components/roles/roles.module').then(m => m.RolesModule),
      //component : EmployeeRoles
    },
    {
      path : 'list' ,
      loadChildren : () => import('./components/list/list.module').then(m => m.ListModule)
    },
   
    {
      path: '', pathMatch: 'full' ,  redirectTo: '/home',
    },
     {
      path : '**' ,  component : PageNotFoundComponent
    },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
