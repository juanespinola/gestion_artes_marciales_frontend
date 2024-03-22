import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card'; 
import { FormBuilder, FormControl, FormGroup,  FormsModule, ReactiveFormsModule, Validators  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../utils/api.service';
@Component({
  selector: 'app-federation-form',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './federation-form.component.html',
  styleUrl: './federation-form.component.scss'
})
export class FederationFormComponent {
  collection = "federation"
  formGroup: FormGroup;
  
  // fields
  objeto: any

  constructor (
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService, 
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
          // this.objeto = res
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
  }
}
