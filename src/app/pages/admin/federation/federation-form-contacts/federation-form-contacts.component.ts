import { Component } from '@angular/core';
import { MaterialModule } from '../../components/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../utils/api.service';

@Component({
  selector: 'app-federation-form-contacts',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './federation-form-contacts.component.html',
  styleUrl: './federation-form-contacts.component.scss'
})
export class FederationFormContactsComponent {
  collection = "federation"
  formGroup: FormGroup;
  
  constructor (
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router
  ){}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      twitter: [''],
      facebook: [''],
      whatsapp: [''],
      instragram: [''],
      email: [''],
      phone_number: [''],
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
        complete: () => {
          console.log('finalizado')
        }
      });

    } 
    
  }


  onSubmit() {
    console.log(this.formGroup.value)
    let id = this.route.snapshot.params['id']
    if(id){
      this.apiService.putData('federationcontact', id, this.formGroup.value)
      .subscribe((res:any) => {
        console.log(res)
        // this.router.navigate([this.collection])
      });
      
    } 
    // else {
    //   this.apiService.postData(this.collection, this.formGroup.value)
    //   .subscribe((res:any) => {
    //     console.log(res)
    //     this.router.navigate([this.collection])
    //   });
    // }
  }

  onBack(){
    this.router.navigate(['admin',this.collection]);
  }
}
