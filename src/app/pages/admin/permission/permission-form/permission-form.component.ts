import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../utils/api.service';
import { MaterialModule } from '../../components/material.module';

@Component({
  selector: 'app-permission-form',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './permission-form.component.html',
  styleUrl: './permission-form.component.scss'
})
export class PermissionFormComponent {
  collection = "permission"
  formGroup: FormGroup;

  constructor (
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router
  ){}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      group_name: ['', Validators.required]
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
        this.router.navigate(["admin", this.collection])
      });
      
    } else {
      this.apiService.postData(this.collection, this.formGroup.value)
      .subscribe((res:any) => {
        console.log(res)
        this.router.navigate(["admin", this.collection])
      });
    }
  }

  onBack(){
    this.router.navigate(["admin", this.collection]);
  }
}
