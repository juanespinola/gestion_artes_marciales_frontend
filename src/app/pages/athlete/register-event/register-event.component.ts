import { Component } from '@angular/core';
import { MaterialModule } from '../../admin/components/material.module';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../utils/api.service';
import { SessionService } from '../../../services/session.service';
import { APP_ROUTES } from '../../../routes';

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
  
  collection = APP_ROUTES.ATHLETE_ENTRYCATEGORIES
  formGroup: FormGroup;

  entriescategories:any = [];
  entry:any = [];

  athlete:any;


  selectEntry: any = [];
  selectEntryForPayment: any = [];

  constructor (
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router,
    private sessionService: SessionService
  ){
    this.athlete = this.sessionService.getUser()
    
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      // name: [this.athlete.name, Validators.required],
      // email: [this.athlete.email, Validators.required],
      // location_id: [this.athlete.location_id],
      // city_id: [this.athlete.city_id],
      // type_document_id: [this.athlete.type_document_id, Validators.required],
      // document: [this.athlete.document, Validators.required],
      // phone: [this.athlete.phone, Validators.required],
      // gender: [this.athlete.gender, Validators.required],
      // birthdate: [this.athlete.birthdate, Validators.required],
      // weight: [this.athlete.weight, Validators.required],
      selectEntryForPayment: [ [], Validators.required]
    });

    this.getEntriesCategories()
    // this.createForm();
  }

  getEntriesCategories(){
    this.apiService.getData(this.collection)
    .subscribe({
      next: (res:any) => {
        console.log( res )
        this.entriescategories = res;
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
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


  asArray(array: any): any {
    return array
  }


  getSelectEntry(entry:any){
    console.log(entry)


    // this.selectEntry.push(event.source.value)
  }



}
