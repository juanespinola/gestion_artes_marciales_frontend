import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../utils/api.service';
import { MaterialModule } from '../../components/material.module';

@Component({
  selector: 'app-location-form',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.scss'
})
export class LocationFormComponent {
  collection = "location"
  formGroup: FormGroup;
  countries: any;
  cities: any;

  categories: any;

  constructor (
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router
  ){}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      description: ['', Validators.required],
      city_id: ['', Validators.required],
      address: ['', Validators.required],
    });
    
    this.createForm();
    this.getCountries();
  }

  createForm() {
    let id = this.route.snapshot.params['id']
    if(id) {
      this.apiService.getData(this.collection+`/${id}`)
      .subscribe({
        next: (res:any) => {
          this.formGroup.patchValue(res) 
          this.getCountries()
          this.getCities(res.city_id)
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

  getCities(country_id:any) {
    this.apiService.postData('athlete/cities', {
      country_id
    })
    .subscribe({
      next: (res:any) => {
        this.cities = res
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
  }

  getCountries() {
    this.apiService.getData('athlete/countries')
      .subscribe({
        next: (res:any) => {
          this.countries = res
        },
        error: (err) => console.log(err),
        complete: () => {}
      });
  }
}
