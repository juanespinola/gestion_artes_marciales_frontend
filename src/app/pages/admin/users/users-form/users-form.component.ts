
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../utils/api.service';
import { MaterialModule } from '../../../../components/material.module';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { Observable, map, startWith } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss'
})
export class UsersFormComponent {
  @ViewChild('userRoleArrayInput') userRoleArrayInput: ElementRef<HTMLInputElement>;

  collection = "user"
  formGroup: FormGroup;
  
  selectedRolesArray:any = []; // roles seleccionados en el input
  roles:any = []; // lista de roles disponible
  userRoles:any = []; // los roles que el usuario posee 

  separatorKeysCodes: number[] = [ENTER, COMMA];
  rolCtrl = new FormControl([]);
  filteredRoles: Observable<string[]>;

  constructor (
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router
  ){
  
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rol: this.rolCtrl,
    });

    // this.filteredRoles = this.rolCtrl.valueChanges.pipe(
    //   startWith(null), map((role: string | null) => (role ? this._filter(role) : this.roles.slice())),
    // );

    this.createForm();
    this.getRoles();
  }


  getRoles(){
    this.apiService.getData("rol")
    .subscribe({
      next: (res:any) => this.roles = res,
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
          this.selectedRolesArray = res.roles
          this.formGroup.patchValue({
            name: res.name,
            email: res.email,
            password: res.password
          });
          this.formGroup.addControl('rol', new FormControl(this.selectedRolesArray))
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

  onBack(){
    this.router.navigate(['users']);
  }



  // Mat Chip Functions
  addRole(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.selectedRolesArray.push(value);
    }
    event.chipInput!.clear();
  }

  remove(role: any): void {
    const index = this.selectedRolesArray.indexOf(role);
    if (index >= 0) {
      this.selectedRolesArray.splice(index, 1);
    }
  }



  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedRolesArray.push(event.option.value);
    this.userRoleArrayInput.nativeElement.value = '';
    this.rolCtrl.setValue(this.selectedRolesArray);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.roles.filter((role:any) => role.toLowerCase().includes(filterValue));
  }

}
