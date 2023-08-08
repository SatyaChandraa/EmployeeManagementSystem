import { Component, EventEmitter, Input, Output } from '@angular/core';
//  import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {

  // @Output() pageIndex  =new EventEmitter();
  // @Output() pageSize  =new EventEmitter();

  @Output() valuesEmitted = new EventEmitter<{ pageSize: number, pageIndex: number }>();

  @Input() recordsCount!: number;

  totalItems : number=3;
  currentPage = 1;
  totalPages! : number
  ngOnInit(){
    console.log(this.recordsCount);
    console.log(this.totalItems );
  
    this.totalPages= Math.ceil(this.recordsCount / this.totalItems);
  }
  
  
  

  pSize: number = 3;

 // pageSize! : number;

 onPageSizeChange(val : any){
  this.totalItems=val.value;  
   const pageSize = val.value;
    const pageIndex = 1;
    console.log(pageIndex,pageSize); 
    this.valuesEmitted.emit({ pageSize, pageIndex });
      this.currentPage=1;
      this.totalPages= Math.ceil(this.recordsCount / this.totalItems);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.goPage();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
     this.goPage();
    }
  }

  goPage(){
    const pageIndex = this.currentPage;
    const pageSize = this.pSize;
    console.log(pageIndex,pageSize); 
    this.valuesEmitted.emit({ pageSize, pageIndex });
    this.totalPages= Math.ceil(this.recordsCount / this.totalItems);

  }

}
