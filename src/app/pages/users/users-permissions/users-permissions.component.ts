import {MatTabsModule} from '@angular/material/tabs';
import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../utils/api.service';

@Component({
  selector: 'app-users-permissions',
  standalone: true,
  imports: [
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatLabel
  ],
  templateUrl: './users-permissions.component.html',
  styleUrl: './users-permissions.component.scss'
})
export class UsersPermissionsComponent {
  collection = "user"
  formGroup: FormGroup;
  
  roles: any[] = [];
  permissions: any[] = [];
  userRoles: any[] = [];
  

  constructor (
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router
  ){}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      roles: ['', Validators.required],
      
    });
    this.createForm();
    this.rolesPermission()

  }


  rolesPermission() {
    this.apiService.getData("rol")
    .subscribe({
      next: (res:any) => this.roles = res,
      error: (err) => console.error(err)
    })

    this.apiService.getData("permission")
    .subscribe({
      next: (res:any) => this.permissions = res,
      error: (err) => console.error(err)
    })
  }

  createForm() {
    let id = this.route.snapshot.params['id']
    
    if(id) {
      this.apiService.getData(this.collection+`/${id}`)
      .subscribe({
        next: (res:any) => {
          console.log(res)
          this.formGroup.patchValue(res)
          this.userRoles = res.roles
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
      this.apiService.putData(this.collection, id, this.formGroup.value)
      .subscribe((res:any) => {
        console.log(res)
        this.router.navigate(["users"])
      });
      
    } else {
      this.apiService.postData(this.collection, this.formGroup.value)
      .subscribe((res:any) => {
        console.log(res)
        this.router.navigate(["users"])
      });
    }
  }
}
