import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeletePopUpComponent } from '../delete-pop-up/delete-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';


@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css']
})
export class MatTableComponent {

  @Input() empData: any = [];
  @Output() myevent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  @Output() pageEvent = new EventEmitter();
  @Input() recordsCount!: number;
  @Output() filterEvent = new EventEmitter();
  @Output() sortChanged = new EventEmitter<{ active: string, direction: string }>();


  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) matsort! : MatSort
  columns: any = [];
  @Input() columnNames :string[] = [];

  pageLength = 10;

  pageSize = 3;
  pageSizeOptions: number[] = [3, 6, 9];

    keyupTimeout:any;

  applyFilter(event: Event) {

    // const key = (event as KeyboardEvent).key || (event.target as HTMLInputElement).value;
    //  if (key === "Backspace") {
    // return; 
    // }

    clearTimeout(this.keyupTimeout);
    this.keyupTimeout = setTimeout(() => {
      const filterValue = (event.target as HTMLInputElement).value;
      console.log(filterValue);
      this.filterEvent.emit( filterValue.trim().toLowerCase())
       this.dataSource.filter = filterValue.trim().toLowerCase();
      console.log("Delayed action after 3 seconds");
    }, 2000);
  }

  ngOnInit() {
    console.log('mat-table started');   
  console.log(this.empData)
    this.dataSource = new MatTableDataSource(this.empData);
    this.columns = Object.keys(this.empData[0]).map(key => {
      return {
        name: key.toUpperCase(),
        prop: key
      };
    });
    console.log(this.columns)
    this.columnNames = this.columns.map((column:any) => column.prop);
    // console.log(this.columnNames);
  }

  ngOnChanges(){
    console.log("onchanging");
    console.log(this.empData);
    
    this.dataSource = new MatTableDataSource(this.empData)
    this.dataSource.paginator = this.paginator;
   // this.dataSource.sort = this.matsort
   // const edataSource = this.dataSource.sortData(this.empData,this.matsort)
    //this.dataSource = new MatTableDataSource(edataSource)


  }

  constructor(private dilog : MatDialog,  private _snackBar: MatSnackBar, ){}

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.empData)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matsort
    console.log(this.matsort.sortChange);
    this.matsort.sortChange.subscribe((sort: Sort) => {
      console.log('entering sort field');
      console.log(sort.active,sort.direction);
      const sortValues = {
        active: sort.active,
        direction: sort.direction
      };
      this.sortChanged.emit(sortValues);
     // console.log(sortValues);
      

      
      //this.loadData(sort.active, sort.direction); // Call the loadData method with the active sort column and direction
    });
    
  }


  editRow(row: any) {
    console.log('Edit row:', row);
      this.editEvent.emit(row)
  }

  // deleteRow(row: any) {
  //   console.log('Delete row:', row);
  //   // Add your code to delete the row here
  // }

  openDeleteConfirmation(d:any){
    const dilogRef = this.dilog.open(DeletePopUpComponent,{
      width : '250px',
      data : d
    });
    
    dilogRef.afterClosed().subscribe((result: any) => 
      {
        console.log(result);
        if(result){
           
            this.myevent.emit(d);  
            this._snackBar.open('Data Deleted Successfully','OK');
        }
      }
      )
  }

  handlePageChange11(pevent: PageEvent): void {
    const pageIndex = pevent.pageIndex;
    const pageSize = pevent.pageSize;
    console.log(pageIndex+1,pageSize);
    this.pageEvent.emit(pevent)
    
  }
  handlePageChange(pevent: { pageSize: number; pageIndex: number; }){
    console.log('Page Size:', pevent.pageSize);
    console.log(' Page: Index', pevent.pageIndex);
    this.pageEvent.emit(pevent)
  }

}
