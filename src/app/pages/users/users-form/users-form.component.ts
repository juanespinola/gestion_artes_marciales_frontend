
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../utils/api.service';
import { MaterialModule } from '../../../components/material.module';
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
  @ViewChild('rolesUserInput') rolesUserInput: ElementRef<HTMLInputElement>;

  collection = "user"
  formGroup: FormGroup;
  
  userRoles:any = [];
  roles:any = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  rol = new FormControl('');
  filteredRoles: Observable<string[]>;
  addOnBlur = true;

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
      rol: this.rol,
    });

    this.filteredRoles = this.rol.valueChanges
    .pipe(
      startWith(null),
      map((role: string | null) => (role ? this._filter(role) : this.roles.slice())),
    );

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
          this.userRoles = res.roles
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


  // Mat Chip Functions
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.roles.push(value);
    }
    event.chipInput!.clear();
  }

  remove(fruit: any): void {
    // const index = this.fruits.indexOf(fruit);
    // if (index >= 0) {
    //   this.fruits.splice(index, 1);
    // }
  }



  selected(event: MatAutocompleteSelectedEvent): void {
    this.roles.push(event.option.viewValue);
    // this.rolesUserInput.nativeElement.value = '';
    this.rol.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.roles.filter((role:any) => role.toLowerCase().includes(filterValue));
  }

}
