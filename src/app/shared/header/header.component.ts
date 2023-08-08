import { Component } from '@angular/core';
import { ListService } from 'src/app/components/list/list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  selectedValue : string = 'employeelist';

  constructor(private listService: ListService ){
    
  }
  ngOnInit(){
    console.log( this.selectedValue);
    this.listService.setSelectedOption(this.selectedValue);

  }

  onOptionChange() {
   // console.log(this.selectedValue); 
    this.listService.setSelectedOption(this.selectedValue);
  }
}
