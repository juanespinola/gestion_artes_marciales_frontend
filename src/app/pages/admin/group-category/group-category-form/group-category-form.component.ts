import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../utils/api.service';
import { MaterialModule } from '../../components/material.module';

@Component({
  selector: 'app-group-category-form',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './group-category-form.component.html',
  styleUrl: './group-category-form.component.scss'
})
export class GroupCategoryFormComponent {
  collection = "groupcategory"
  formGroup: FormGroup;

  categories: any;

  constructor (
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router
  ){}
 // NECESITAMOS TRAER LA LISTA DE LAS CATEGORIAS, FEDERACIONES etc para 
  // rellenar los selects y con el id de que traemos, podemos colocarlek

  // Tratar de finalizar la parte de los usuarios, con esto necesitamos saber si es 
  // de una federacion, una asociacion o parte del sistema
  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      group_category: ['', Validators.required],
      initial_value: ['', Validators.required],
      final_value: ['', Validators.required],
      category_id:['', Validators.required],
    });
    this.getCategories()
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

  getCategories() {
    this.apiService.getData('category')
      .subscribe({
        next: (res:any) => {
          console.log(res)
          this.categories = res
        },
        error: (err) => console.log(err),
        complete: () => {}
      });
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
    this.router.navigate([this.collection]);
  }
}
