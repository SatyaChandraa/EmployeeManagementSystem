import { Component } from '@angular/core';
import { ListService } from './list.service';
import { RolesService } from '../roles/roles.service';
import { PageEvent } from '@angular/material/paginator';
import { EmployeeListService } from '../employee-list/employee-list.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  option : string = '';
  
  roles: any = [];
  role: any = '';
  showForm = false;
  selectedLevel: any;
  addTrue = true;
  updateTrue = false;
  toId! :number;
  showSpinner: boolean = false

  recordsCount! : number;
  pageIndex : number =0;
  pageSize :number =3;

  data : any;
  subscription!: Subscription;
  columnNames : string[] = [];
  showGrid : boolean = false;

  constructor(private listService: ListService,private rolesService: RolesService,private employeeListService: EmployeeListService,private router : Router ){

    console.log("Enetring List componenent");

    
  }
  ngOnInit(){
    this.subscription =   this.listService.selectedOption.subscribe((val:any)=>{
      console.log(val);
      this.option =val;
      console.log(this.option);
      if(this.option=='employeelist'){
        this.showGrid=false;
        this.employeeListService.getDataWithPagination(this.pageIndex,this.pageSize).subscribe(response => {
          this.showGrid=true;
          this.data = response.body;
          const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10); // Total count of objects
          this.recordsCount = totalCount;
         // this.columnNames=['name','email','role','id']
        });
      }
      if(this.option=='roleslist'){
        this.showGrid=false;
        this.rolesService.getDataWithPagination(this.pageIndex,this.pageSize).subscribe(response => {
         this.showGrid=true;
           this.data = response.body;
           const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10); // Total count of objects
           this.recordsCount = totalCount;
        //  this.columnNames=['role','level','id']

         });
      } 
    })
    
  }
  ngOnDestroy() {
    // Unsubscribe from the subscription to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    console.log('Component destroyed',this.option );
    
  }

  empNav(d: any) {
    this.router.navigate(['/employee-form', d.id]);
  }

  
  ngOnChanges(){
    // this.fetchData(this.pageIndex,this.pageSize)
    
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

  delete(r: any): void {
    
    if(this.option=='roleslist'){
    console.log('role delete method')
    this.roles = this.roles.filter((m: any) => m !== r);
    this.rolesService.deleteRole(r.id).subscribe(
      (data1: any) => {
       this.fetchData(this.pageIndex,this.pageSize)
      }
    );
    }
    else{
      this.employeeListService.delete(r.id).subscribe(() => {
        this.data = this.data.filter((m: any) => m !== r);
        //this.getData();
        this.fetchData(this.pageIndex, this.pageSize)
      });
    }

  }
  // roleNav(){
  //   this.route.navigate(['/contact']);
  // }

  fetchData(pIndex:number,pSize:number): void {
    if(this.option=='roleslist'){
      this.rolesService.getDataWithPagination(pIndex,pSize).subscribe(response => {
        // const data = response.body; // Retrieved data items
         this.data = response.body;
         const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10); // Total count of objects
         this.recordsCount = totalCount;
       });
    }
    else{
      this.employeeListService.getDataWithPagination(pIndex, pSize).subscribe(response => {
        // const data = response.body; // Retrieved data items
        this.data = response.body;
        console.log(this.data);
  
        const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10); // Total count of objects
        this.recordsCount = totalCount;
      });
    }
 
}

pageEvent(pevent:PageEvent){
  console.log( 'In the Roles lsit', pevent.pageIndex,pevent.pageSize);
  this.pageIndex = pevent.pageIndex;
  this.pageSize = pevent.pageSize;
   this.fetchData( this.pageIndex, this.pageSize);
 }

 filter(fEvent:any){

  if(this.option=='roleslist'){
          console.log('Roles filter')
          console.log(fEvent);
          const fValue = fEvent
          if(fValue){
            this.rolesService.filterValue(fValue).subscribe((resp:any)=>
            {
              console.log(resp);
              if(resp.length){
              this.data = resp;    
              }
            }
              )
          }
          else(
            this.fetchData( this.pageIndex, this.pageSize)
          )
  }
  else{
    console.log('Employees filter')
    console.log(fEvent);
    const fValue = fEvent
    if (fValue) {
      this.employeeListService.filterValue(fValue).subscribe((resp: any) => {
        console.log(resp);
        if (resp.length) {
          this.data = resp;
        }
      }
      )
    }
    else (
      this.fetchData(this.pageIndex, this.pageSize)
    )
  }


}

  

  

}
