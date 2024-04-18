import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../components/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../utils/api.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss'
})
export class EventFormComponent {
  collection = "event"
  formGroup: FormGroup;

  categories: any;

  constructor (
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router
  ){}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      description: ['', Validators.required],
      location_id: ['', Validators.required],
      initial_date: ['', Validators.required],
      final_date: [''],
      event_type_id: ['', Validators.required],
      event_status_id: ['', Validators.required],
      inscription_fee: ['', Validators.required],
      available_slots: ['', Validators.required],
    });
    
    this.createForm();
  }

  createForm() {
    let id = this.route.snapshot.params['id']
    if(id) {
      this.apiService.getData(this.collection+`/${id}`)
      .subscribe({
        next: (res:any) => {
          console.log(res)
          this.formGroup.patchValue(res)
        },
        error: (err) => console.log(err),
        complete: () => {}
      });
    } 
    
  }

  getCategories() {
    this.apiService.getData('category')
      .subscribe({
        next: (res:any) => {
          console.log(res)
          this.categories = res
        },
        error: (err) => console.log(err),
        complete: () => {}
      });
  }


  onSubmit() {
    console.log(this.formGroup.value)
    let id = this.route.snapshot.params['id']
    if(id){
      this.apiService.putData(this.collection, id, this.formGroup.value)
      .subscribe((res:any) => {
        console.log(res)
        this.router.navigate([this.collection])
      });
      
    } else {
      this.apiService.postData(this.collection, this.formGroup.value)
      .subscribe((res:any) => {
        console.log(res)
        this.router.navigate([this.collection])
      });
    }
  }

  onBack(){
    this.router.navigate([this.collection]);
  }
}
