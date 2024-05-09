import { Component } from '@angular/core';
import { MaterialModule } from '../../../../components/material.module';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../utils/api.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-event-form-images',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './event-form-images.component.html',
  styleUrl: './event-form-images.component.scss'
})
export class EventFormImagesComponent {
  collection = "mediaevent"
  formGroup: UntypedFormGroup | any;
  // formGroup: FormGroup | any;
  rows: UntypedFormArray | any;
  file: File | any;

  constructor (
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router
  ){
    
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      // rows: this.formBuilder.array([])
    });
    this.rows = this.formBuilder.array([]);
    this.formGroup.addControl('rows', this.rows)
    this.rows.push(this.createItemFormGroup())
    this.createForm();

  }

  createForm() {
    let id = this.route.snapshot.params['id']
    if(id) {
      // this.apiService.getData(this.collection+`/${id}`)
      // .subscribe({
      //   next: (res:any) => {
      //     console.log(res)
      //     this.formGroup.patchValue(res)
          
      //   },
      //   error: (err) => console.log(err),
      //   complete: () => {}
      // });
    } 
  }

  createItemFormGroup(): FormGroup {
    return this.formBuilder.group({
      file: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      event_id: this.route.snapshot.params['id']
    });
  }

  onAddRow(): void {
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex: number): void {
    this.rows.removeAt(rowIndex);
  }

  // get rows(): FormArray {
  //   return this.formGroup.get('rows') as FormArray;
  // }

  onSubmit() {   
    let id = this.route.snapshot.params['id']

   
    let listFile: any = [];
    const formData = new FormData()
    // listFile = this.rows.controls.map((control:any) => {
    //     let fileObj:any = {};
    //     fileObj.file = control.get('file').value;
    //     fileObj.type = control.get('type').value;
    //     fileObj.event_id = id;
    //     return fileObj
    //   });  
      // console.log(listFile)
    // formData.append('rows', JSON.stringify(listFile))
    // console.log(formData)

    this.rows.controls.forEach((control:any) => {
      formData.append('file[]', control.get('file').value);
      formData.append('type[]', control.get('type').value);
      formData.append('event_id[]', this.route.snapshot.params['id']);
    });  
    
    
    if(id){
      let options = {
        // headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
      }
      this.apiService.postData(this.collection, formData, options)
      .subscribe((res:any) => {
        console.log(res)
        // this.router.navigate(['admin','event']);
      });
    }
  }

  onBack(){
    this.router.navigate(['admin', 'event']);
  }

  selectFile(event: any, index: any): void {
    // console.log(this.rows.at(index).get('file'))
    // this.file = event.target.files[0];
    
    this.rows.at(index).get('file').value = event.target.files[0];
    

    // this.fileName = event.target.files[0].name;
    // this.rows.controls[index].get('file').setValue(event.target.files[0]);
    // this.formGroup.addControl('rows', {file: event.target.files[0].name, ...this.rows  });   
    // console.log(event.target.files[0].name)
    // console.log(index)
    // this.formGroup.value.rows[index].file = event.target.files[0].name
    // let a = this.formGroup
    // console.log(a)
    // this.formGroup.get('rows')['controls'].setValue()


    // if (!event.target.files[0] || event.target.files[0].length === 0) {
    //   // this.msg = 'You must select an image';
    //   return;
    // }
    // const mimeType = event.target.files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   // this.msg = "Only images are supported";
    //   return;
    // }

    // const reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);
    // reader.onload = (_event) => {
    //   this.fileName = reader.result;
    //   console.log(this.fileName)
    // };
  }
}
