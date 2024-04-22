import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../../components/material.module';
import { ApiService } from '../../../../utils/api.service';


@Component({
  selector: 'app-association-form',
  standalone: true,
  imports: [ 
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './association-form.component.html',
  styleUrl: './association-form.component.scss'
})
export class AssociationFormComponent {
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
