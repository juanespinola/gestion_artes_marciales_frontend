import { Component, Injectable, ViewChild} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../utils/api.service';
import { MaterialModule } from '../../../components/material.module';

@Component({
  selector: 'app-rol-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './rol-form.component.html',
  styleUrl: './rol-form.component.scss',
})
export class RolFormComponent {
  collection = "rol"
  formGroup: FormGroup;
  permissionsGroup: any[] = [];
  allpermissions: any[] = [];
  rolePermissions: any[] = []

  roles:any = [];
  permissions:any = [];

  constructor (
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _apiService: ApiService, 
    private router: Router,
  ){}

  ngOnInit() {
    // const rolePermission = this.p.map
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      // rolePermissionArray: this.formBuilder.array([])
      rolePermissionArray: new FormControl([])
    });
    this.getExistPermissionByGroup()
    this.createForm();
  }

  // Obtiene los permisos que existen en el sistema
  getExistPermissionByGroup() {
    this._apiService.getData("permissionsbygroup")
    .subscribe({
      next: (res:any) => {
        this.rolePermissions = res
      },
      error: (err) => console.error(err)
    })
  }

  createForm() {
    let id = this.route.snapshot.params['id']
    if(id) {
      this._apiService.getData(this.collection+`/${id}`)
      .subscribe({
        next: (res:any) => {
          this.roles = res.roles;
          this.permissions = res.permissions;
   
          this.formGroup.patchValue({
            name: res.roles.name,
            // rolePermissionArray: selectedPermissions         
          })
          
          this.formGroup.addControl('rolePermissionArray', new FormControl(this.roles.permissions))
        },
        error: (err) => console.log(err),
        complete: () => {
        }
      });
    } else {
      this._apiService.getData('permission')
      .subscribe({
        next: (res:any) => {
          console.log(res)
          this.permissions = res;    
          this.formGroup.addControl('rolePermissionArray', new FormControl(res.permissions))
        },
        error: (err) => console.log(err),
        complete: () => {}
    })
  }
}


  isSelected(permissions: any): any {
    let id = this.route.snapshot.params['id']
    if(id){
      return this.roles.permissions.some((rol:any) => rol.id === permissions.id)
    }
  }

  isPermissionSelected(permissionName: string): boolean {
    const rolePermissionArray = this.formGroup.get('rolePermissionArray');
    return rolePermissionArray ? rolePermissionArray.value.includes(permissionName) : false;
  }


  onSubmit() {
    let id = this.route.snapshot.params['id']
    console.log(this.formGroup.value)
    if(id){
      this._apiService.putData(this.collection, id, this.formGroup.value)
      .subscribe((res:any) => {
        console.log(res)
        this.router.navigate([this.collection])
      });
      
    } else {
      this._apiService.postData(this.collection, this.formGroup.value)
      .subscribe((res:any) => {
        console.log(res)
        this.router.navigate([this.collection])
      });
    }
  }


  
}
