import { Component } from '@angular/core';
import { MaterialModule } from '../../components/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../utils/api.service';

@Component({
  selector: 'app-association-form-authorities',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './association-form-authorities.component.html',
  styleUrl: './association-form-authorities.component.scss'
})
export class AssociationFormAuthoritiesComponent {
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
      president: [''],
      vice_president: [''],
      treasurer: ['']
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
      this.apiService.putData('federationauthoritie', id, this.formGroup.value)
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
