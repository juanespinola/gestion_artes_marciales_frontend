import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../../components/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../utils/api.service';
import moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';


@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class EventFormComponent {
  collection = "event"
  formGroup: FormGroup;

  locations: any;
  typesevent: any;
  statusevent: any;

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
      initial_time: ['', Validators.required],
      final_time: [''],
      type_event_id: ['', Validators.required],
      status_event_id: ['', Validators.required],
      inscription_fee: ['', Validators.required],
      available_slots: ['', Validators.required],
    });
    this.getLocations();
    this.getStatusEvent();
    this.getTypesEvent();
    this.createForm();
  }

  createForm() {
    let id = this.route.snapshot.params['id']
    if(id) {
      this.apiService.getData(this.collection+`/${id}`)
      .subscribe({
        next: (res:any) => {
          console.log(res.initial_date)
          
          this.formGroup.patchValue({
            description: res.description,
            location_id: res.location_id,
            initial_date: moment(res.initial_date),
            final_date: moment(res.final_date),
            initial_time: res.initial_time,
            final_time: res.final_time,
            type_event_id: res.type_event_id,
            status_event_id: res.status_event_id,
            inscription_fee: res.inscription_fee,
            available_slots: res.available_slots
          })
          
        },
        error: (err) => console.log(err),
        complete: () => {}
      });
    } 
    
  }

  getLocations() {
    this.apiService.getData('location')
      .subscribe({
        next: (res:any) => {
          console.log(res)
          this.locations = res
        },
        error: (err) => console.log(err),
        complete: () => {}
      });
  }

  getTypesEvent() {
    this.apiService.getData('typesevent')
      .subscribe({
        next: (res:any) => {
          console.log(res)
          this.typesevent = res
        },
        error: (err) => console.log(err),
        complete: () => {}
      });
  }

  getStatusEvent() {
    this.apiService.getData('statusevent')
      .subscribe({
        next: (res:any) => {
          console.log(res)
          this.statusevent = res
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
    this.router.navigate(['admin',this.collection]);
  }
}
