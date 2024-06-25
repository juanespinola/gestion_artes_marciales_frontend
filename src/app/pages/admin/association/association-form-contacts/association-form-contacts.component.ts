import { Component } from '@angular/core';
import { MaterialModule } from '../../components/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../utils/api.service';

@Component({
  selector: 'app-association-form-contacts',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './association-form-contacts.component.html',
  styleUrl: './association-form-contacts.component.scss'
})
export class AssociationFormContactsComponent {
  collection = "association"
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
      instagram: [''],
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
    
    let id = this.route.snapshot.params['id']
    if(id){
      this.apiService.putData('federationcontact', id, this.formGroup.value)
      .subscribe((res:any) => {
        console.log(res)
        // this.router.navigate([this.collection])
      });
      
    } 
  }

  onBack(){
    this.router.navigate(['admin',this.collection]);
  }
}
