import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,  FormsModule, ReactiveFormsModule, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../utils/api.service';
import { MaterialModule } from '../../components/material.module';
import { FederationFormAuthoritiesComponent } from '../federation-form-authorities/federation-form-authorities.component';
import { FederationFormContactsComponent } from '../federation-form-contacts/federation-form-contacts.component';
@Component({
  selector: 'app-federation-form',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FederationFormAuthoritiesComponent,
    FederationFormContactsComponent
  ],
  templateUrl: './federation-form.component.html',
  styleUrl: './federation-form.component.scss'
})
export class FederationFormComponent {
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
      description: ['', Validators.required]
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
      this.apiService.putData(this.collection, id, this.formGroup.value)
      .subscribe((res:any) => {
        console.log(res)
        this.router.navigate(['admin',this.collection])
      });
      
    } else {
      this.apiService.postData(this.collection, this.formGroup.value)
      .subscribe((res:any) => {
        console.log(res)
        this.router.navigate(['admin',this.collection])
      });
    }
  }

  onBack(){
    this.router.navigate(['admin',this.collection]);
  }
  
}
