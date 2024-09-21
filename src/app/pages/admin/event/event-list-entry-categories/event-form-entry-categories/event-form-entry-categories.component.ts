import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../components/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../../utils/api.service';

@Component({
  selector: 'app-event-form-entry-categories',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './event-form-entry-categories.component.html',
  styleUrl: './event-form-entry-categories.component.scss'
})
export class EventFormEntryCategoriesComponent {

  action: string = '';
  local_data: any;

  belts: any =  [];

  constructor(
    public dialogRef: MatDialogRef<EventFormEntryCategoriesComponent>, 
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router) {
      this.local_data = { ...data };
      this.action = this.local_data.action;
      console.log(this.local_data)
  
  }

  collection = "entrycategories"
  formGroup: FormGroup;
  


  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      min_age: ['', Validators.required],
      max_age: ['', Validators.required],
      min_weight: [''],
      max_weight: [''],
      belt_id: ['', Validators.required],
      gender: ['', Validators.required],
      clothes: ['', Validators.required],
      event_id: this.local_data.event_id
    });
    this.createForm();
    this.getBelts()
  }

  createForm() {
    let id = this.local_data.id
    
    if(id) {
      this.apiService.getData(this.collection+`/${id}`)
      .subscribe({
        next: (res:any) => {
          console.log(res)
          this.formGroup.patchValue(res)
        },
        error: (err) => console.log(err),
        complete: () => {
          console.log('finalizado')
        }
      });

    } 
    
  }


  getBelts(){
    this.apiService.getData(`belt`)
    .subscribe({
      next: (res:any) => {
        console.log(res)
        this.belts = res
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
  }

  onSubmit() {
    console.log(this.formGroup.value)
    let id = this.local_data.id
    if(id){
      this.apiService.putData(this.collection, id, this.formGroup.value)
      .subscribe((res:any) => {
        console.log(res)
        // this.router.navigate([this.collection])
        this.dialogRef.close({ event: this.action, data: this.local_data });
      });
      
    } else {
      this.apiService.postData(this.collection, this.formGroup.value)
      .subscribe((res:any) => {
        console.log(res)
        // this.router.navigate([this.collection])
        this.dialogRef.close({ event: this.action, data: this.local_data });
      });
    }
  }

  onBack(){
    // this.router.navigate(['admin',this.collection]);
    this.dialogRef.close({ event: 'cancel' });
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
