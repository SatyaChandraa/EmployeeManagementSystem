import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { AddService } from './add-form.service';
import { ActivatedRoute, Router } from '@angular/router';
 import {MatSnackBar, _MatSnackBarBase} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add',
  templateUrl: './add-form.html',
  styleUrls: ['./add-form.css']
})
export class AddForm {


  id!: number;
  myForm!: FormGroup;
  data: any;
  formStatus: boolean = true;
  buttonStatusU = false;
  buttonStatusA = false;
  selectedOption :any ;
  roles : any =[];
  checkboxesFormGroup! : FormGroup;
  showChecked = false;
  selectedCheck: any[] = [];
  mindate = new Date();
  selectedRadio: any[]= [];
  showRadio=false;

  selectedSkills : string[] = [];
 
 


  ngOnInit() {

    console.log(123)

    this.getRoles();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id > 0) {
      this.getDataId(this.id);
      this.buttonStatusU = true;
    }
    else{
      this.buttonStatusA = true;
    }
  }
  getRoles() {
    this.addService.getRoles().subscribe(
      data => { this.roles = data }
    )
  }
  constructor(
    private route: ActivatedRoute,
    private addService: AddService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router : Router,
    private datePipe : DatePipe
    
   )
  {
    this.myForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(50),Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [Validators.required, ]),
      contact : new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('^[0-9]+$')]),
      gender : new FormControl('',[Validators.required]),
      summary : new FormControl('',[Validators.maxLength(500)]),
       skills : new FormControl ([],[Validators.required]),
      date : new FormControl('', [Validators.required,]),
     checkbox : new FormControl ('',[Validators.required]),
      // languages: new FormGroup({
      //   telugu: new FormControl(false),
      //   hindi: new FormControl(false),
      //   english: new FormControl(false),
      //   tamil: new FormControl(false),
      //   kannada: new FormControl(false),
      //   french: new FormControl(false),
      // })
 
    })
    
  //  this.mindate.setFullYear(this.mindate.getFullYear() - 18); 

  //  const currentDate = new Date();
    // this.mindate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
  }

  // get gender(){return this.myForm.get("gender")}

  // atLeastOneCheckedValidator(control:FormGroup){

  //   const checked = Object.values(control.value).some(value => value === true);
  //   return checked ? null : { 'atLeastOneChecked': true };

  // }

  // checking():Validators{

  //    if(this.check.length<1){
  //     console.log(this.check.length)
  //     this.showChecked=true;
  //     return { validCheck : true}
  //   }
  // };

  languages=[
    {id:1,name:"Telugu"},
    {id:2,name:"English" },
    {id:3,name:"Tamil"},
    {id:4,name:"Kannada"},
    {id:5,name:"Hindi"},
    {id:6,name:"French" },
    
   ];


   checking(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value = control.value as any[];
      console.log(value)
      if(value.length<1){
        return { 'validCheck': true };
      } else {
        return null;
      }
    };
  }

   ageValidator(control:FormControl) {
    const dateValue = control.value;
    if (!dateValue) {
      return null;
    }
    const birthDate = new Date(dateValue);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    birthDate.setFullYear(today.getFullYear());
    // if (today < birthDate) {
    //   age--;
    // }
    if (age < 18) {
      return { tooYoung: true };
    }
    return null;
  };

  

  checked(event:any,value:string){
    console.log()
   
  //  const checkboxValue = event.source.value;
  //   const isChecked = event.checked;
  //   this.myForm.controls[checkboxValue].setValue(isChecked);
  //   console.log(this.myForm.get('sdf')?.value);

  const val = event.source.value;
     console.log(val)

  if(event.checked){
    this.selectedCheck.push(val);
    //console.log(this.selectedCheck);
    this.showChecked=false;
  }
  else{
    this.selectedCheck = this.selectedCheck.filter(c => c != val);
    console.log(this.selectedCheck);
   if(this.selectedCheck.length==0){
      this.showChecked=true; 
    }
  }
  }

  radioChecked(check:any,value:string){
      //console.log('radio callled',check,value)
    if(check.value){
     // console.log('enterd if')
      this.selectedRadio.push(value);
      //console.log(this.selectedRadio);
      this.showRadio=false;
    }
    else{
      this.selectedRadio = this.selectedRadio.filter(r => r !=value);
      //console.log('enterd else')
    //   if(this.selectedRadio.length==0){
    //     this.showRadio=true;

    // }
  }
}

  openSnackBar(){
    if (this.myForm.valid) {
    this._snackBar.open('Data Added Successfull','OK');
    }
  }

  navigate(){
    this.router.navigate(['/employee-list']);

   
  }
  getDataId(id: number) {
    this.addService.getDataid(id).
      subscribe(
        (data1: any) =>
        {
          this.myForm.patchValue(data1);
          // this.myForm.patchValue(
          //   {
          //     languages : data1.languages.includes('english')

          //   }
          // );
          

        }
        
        //  {this.data = data1}, 
        // { console.log(data1) },
        // (error) => {console.error('Error data', error)
      )
  }

  onSubmit(){
   
    //console.log(this.myForm)
      // this.myForm.get('skills.selectedSkills')?.valueChanges.subscribe((selectedSkills:any) => {
      //   console.log(selectedSkills); 
      // });
    console.log(this.myForm.controls['date'].value);
    

    if(this.selectedCheck.length==0){
      this.showChecked=true;
    }
    if(this.selectedRadio.length==0){
      this.showRadio=true;
      // console.log( this.myForm.controls['checkbox'].value)
    
    
     
    }

  if (this.myForm.valid) {
              let emp = {
                name: this.myForm.controls['name'].value,
                email: this.myForm.controls['email'].value,
                role: this.myForm.controls['role'].value,
                contact : this.myForm.controls['contact'].value,
                gender : this.myForm.controls['gender'].value,
                date : this.datePipe.transform(this.myForm.controls['date'].value, 'yyyy-MM-dd'),
                //date : this.myForm.controls['date'].value,
                summary : this.myForm.controls['summary'].value,
                skills : this.selectedSkills,
                languages : this.selectedCheck
              }

    if(this.id>0)
    {
      
      console.log('entering update field')
      this.addService.updateData(emp,this.id).subscribe(
        ()=> {
          // console.log('Data updated successfully'), 
          this.myForm.reset()
        }
       
      );
      this._snackBar.open('Data Updated Successfull','OK');
      this.router.navigate(['/employee-list']);
    }
    else{
      
      this.addService.addData(emp).subscribe((resp: any)=>
      
      console.log("Data Added "),this.myForm.reset,
      
      );
      this._snackBar.open('Data Added Successfull','OK');
      this.router.navigate(['/employee-list']);
      //location.reload();

    }
   
  
    this.myForm.reset();

  }

}


}


  











