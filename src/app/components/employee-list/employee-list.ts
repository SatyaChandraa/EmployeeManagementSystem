import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
// import { DeletePopUpComponent } from 'src/app/delete-pop-up/delete-pop-up.component';
import { Router } from '@angular/router';
import { EmployeeListService } from './employee-list.service';
import { map, pipe } from 'rxjs';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-EmployeeList',
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css']
})
export class EmployeeList {

  data: any = [];
  showSpinner: boolean = false;
  pageIndex: number = 0;
  pageSize: number = 3;
  recordsCount!: number

  displayedColumns: string[] = ['id', 'name', 'role', 'email', 'update', 'delete'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public EmployeeListService: EmployeeListService, private dilog: MatDialog, private route: Router) {

  }
  navigate() {
    this.route.navigate(['/employee-form']);
  }


  ngOnInit() {
    console.log('component started');
    // this.getData();
    this.fetchData(this.pageIndex, this.pageSize);


  }




  getData() {
    this.EmployeeListService.getData()
      .subscribe((data1: any) => {
        this.data = data1;
        console.log('date in the emplyee list', data1[0].date);
      });
  }

  delete(d: any): void {
    this.EmployeeListService.delete(d.id).subscribe(() => {
      this.data = this.data.filter((m: any) => m !== d);
      //this.getData();
      this.fetchData(this.pageIndex, this.pageSize)
    });
  }

  empNav(d: any) {
    this.route.navigate(['/employee-form', d.id]);
  }

  fetchData(pIndex: number, pSize: number): void {
    this.EmployeeListService.getDataWithPagination(pIndex, pSize).subscribe(response => {
      // const data = response.body; // Retrieved data items
      this.data = response.body;
      console.log(this.data);

      const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10); // Total count of objects
      this.recordsCount = totalCount;
    });
  }
  pageEvent(pevent: PageEvent) {
    console.log('In the empoyee lsit', pevent.pageIndex, pevent.pageSize);
    this.pageIndex = pevent.pageIndex;
    this.pageSize = pevent.pageSize;
    this.fetchData(this.pageIndex, this.pageSize);
  }


  filter(fEvent: any) {
    console.log('emplyee filter')
    console.log(fEvent);
    const fValue = fEvent
    if (fValue) {
      this.EmployeeListService.filterValue(fValue).subscribe((resp: any) => {
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

  sortChange(sEvent: any) {
    console.log(sEvent.active);
    console.log(sEvent.direction);
    this.EmployeeListService.sortedData(sEvent.active, sEvent.direction, this.pageSize, this.pageIndex).subscribe((resp: any) => {
      console.log(resp);
      this.data = resp;
      // this.fetchData( this.pageIndex, this.pageSize)
    })
  }


}





