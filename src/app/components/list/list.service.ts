import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }

  //  selectedOptionSubject = new Subject<string>();
   selectedOptionSubject = new BehaviorSubject<string>('employeelist');

  selectedOption = this.selectedOptionSubject.asObservable();

  setSelectedOption(selectedOption: string) {
    this.selectedOptionSubject.next(selectedOption);
  }


}
