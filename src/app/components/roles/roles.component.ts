import { Component, ViewChild } from '@angular/core';


import { NgForm } from '@angular/forms';
import { RolesService } from './roles.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { EmployeeListService } from '../employee-list/employee-list.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {

  roles: any = [];
  role: any = '';
  showForm = false;
  selectedLevel: any;
  @ViewChild('myform') form !: NgForm;
  addTrue = true;
  updateTrue = false;
  toId! :number;
  showSpinner: boolean = false

  recordsCount! : number;
  pageIndex : number =0;
  pageSize :number =3;

  constructor(private rolesService: RolesService, private _snackBar: MatSnackBar,private route : Router,public employeeListService: EmployeeListService) { }

  ngOnInit() {

    //this.getRoles();
    this.fetchData(this.pageIndex,this.pageSize)
    // this.showSpinner = true;
    // setTimeout(() => {
    //   this.showSpinner = false;
    // }, 2000);
  }
  ngOnChanges(){
   // this.getRoles();
    this.fetchData(this.pageIndex,this.pageSize)
  }

  displayForm() {
   
    this.showForm = true;
    this.addTrue = true;
    this.updateTrue = false
    // console.log(this.form);
    // if(this.form){
    //   console.log(this.form);
    //   this.form.reset();
    //   //this.form.resetForm();

    // }
   
  }
  show(id: number) {

    this.toId = id;
    console.log(id);
    this.showForm = true;
    this.updateTrue = true;
    this.addTrue = false;
    const rl = this.roles.find((r: any) => r.id === id);
    this.selectedLevel = rl.level;
    this.role = rl.role;


  }
  close() {
    this.showForm = false;
  }
  getRoles() {
    this.rolesService.getRoles().subscribe(
      data => { this.roles = data
      // console.log(data.length); 
      }
    )
  }

  delete(r: any): void {
    console.log('role delete method')

    this.roles = this.roles.filter((m: any) => m !== r);
    this.rolesService.deleteRole(r.id).subscribe(
      (data1: any) => {
       // this.getRoles();
       this.fetchData(this.pageIndex,this.pageSize)
      }
    );
  }
  roleNav(){
    this.route.navigate(['/contact']);
  }

  addData(role: any) {
    let rdata = {
      'role': role,
      'level': this.selectedLevel
    }

    console.log(role)

    if(this.form.valid){
     
     
     this._snackBar.open('Data Added Successfully', 'Dismiss', {
      duration: 3000, });
        
      this.rolesService.addRole(rdata).subscribe(
        (resp: any) => {
          this.roles.push(rdata)
          //this.roleNav();
          this.fetchData(this.pageIndex,this.pageSize)

          
        }
      );


    }
      
  }
  clear(){
    this.form.resetForm();
  }

  updateData(role: any) {

    let rdata = {
      'role': role,
      'level': this.selectedLevel
    }
    if(this.form.valid){
      this._snackBar.open('Data updated Successfully', 'Dismiss', {
        duration: 3000, });
      this.rolesService.updateRoles(rdata, this.toId).subscribe(
        () => {
          // this.getRoles();
          this.fetchData(this.pageIndex,this.pageSize);
          this.form.resetForm();
          this.close(); 
        }
        )
    }
  }

  fetchData(pIndex:number,pSize:number): void {
    this.rolesService.getDataWithPagination(pIndex,pSize).subscribe(response => {
     // const data = response.body; // Retrieved data items
      this.roles = response.body;
      const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10); // Total count of objects
      this.recordsCount = totalCount;
    });
}

pageEvent(pevent:PageEvent){
  console.log( 'In the Roles lsit', pevent.pageIndex,pevent.pageSize);
  this.pageIndex = pevent.pageIndex;
  this.pageSize = pevent.pageSize;
   this.fetchData( this.pageIndex, this.pageSize);
 }

 filter(fEvent:any){
  console.log('roles filter')
  console.log(fEvent);
  const fValue = fEvent
  if(fValue){
    this.rolesService.filterValue(fValue).subscribe((resp:any)=>
    {
      console.log(resp);
      if(resp.length){
      this.roles = resp;    
      }
    }
      )
  }
  else(
    this.fetchData( this.pageIndex, this.pageSize)
  )
}


}
