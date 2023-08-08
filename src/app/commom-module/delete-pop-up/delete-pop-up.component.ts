import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-pop-up',
  templateUrl: './delete-pop-up.component.html',
  styleUrls: ['./delete-pop-up.component.css']
})
export class DeletePopUpComponent {

  id! : number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data); 
     
  }

}
