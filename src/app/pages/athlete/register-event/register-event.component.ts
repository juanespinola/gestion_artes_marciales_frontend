import { Component } from '@angular/core';
import { MaterialModule } from '../../admin/components/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../utils/api.service';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-register-event',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register-event.component.html',
  styleUrl: './register-event.component.scss'
})
export class RegisterEventComponent {
  
  collection = "event"
  formGroup: FormGroup;

  athlete:any;

  constructor (
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router,
    private sessionService: SessionService
  ){
    this.athlete = this.sessionService.getUser()
    console.log(this.athlete)
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: [this.athlete.name, Validators.required],
      email: [this.athlete.email, Validators.required],
      location_id: [this.athlete.location_id],
      city_id: [this.athlete.city_id],
      type_document_id: [this.athlete.type_document_id, Validators.required],
      document: [this.athlete.document, Validators.required],
      phone: [this.athlete.phone, Validators.required],
      gender: [this.athlete.gender, Validators.required],
      birthdate: [this.athlete.birthdate, Validators.required],
      weight: [this.athlete.weight, Validators.required],
    });

    // this.createForm();
  }


  createForm() {
    let id = this.route.snapshot.params['id']
    if(id) {
      this.apiService.getData(this.collection+`/${id}`)
      .subscribe({
        next: (res:any) => {          
          this.formGroup.patchValue({
            name: res.name,
            email: res.email,
            password: res.password,
            location_id: res.location_id,
            city_id: res.city_id,
            type_document_id: res.type_document_id,
            document: res.document,
            phone: res.phone,
            gender: res.gender,
            birthdate: res.birthdate,
            weight: res.weight,
          })
          
        },
        error: (err) => console.log(err),
        complete: () => {}
      });
    } 
    
  }

  onSubmit() {
    console.log(this.formGroup.value)
    let id = this.route.snapshot.params['id']
    if(id){
      this.apiService.putData(this.collection, id, this.formGroup.value)
      .subscribe((res:any) => {
        // this.router.navigate([this.collection])
      });
      
    } else {
      this.apiService.postData(this.collection, this.formGroup.value)
      .subscribe((res:any) => {
        // this.router.navigate([this.collection])
      });
    }
  }

  onBack(){
    this.router.navigate(['admin',this.collection]);
  }
}
