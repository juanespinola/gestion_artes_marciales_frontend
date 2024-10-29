import { Component } from '@angular/core';
import { MaterialModule } from '../component/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../utils/api.service';
import { SessionService } from '../../../services/session.service';
import { AlertsService } from '../../../services/alerts.service';
import { NavigationService } from '../../../services/navigation.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { ComponentsModule } from '../component/components.module';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MaterialModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class SignUpComponent {
  
  formGroup: FormGroup;

  countries:any = [];
  cities:any = [];
  typesDocument:any = [];
  academies:any = [];
  belts:any = [];
  federations:any = [];
  associations:any = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router,
    private sessionService: SessionService,
    private alertsService: AlertsService,
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private location: Location,
  ){
    this.getCountries();
    this.getTypesDocument()
    this.getFederations()
    this.getAcademies()
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      document: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required],
      country_id: [''],
      city_id: [''],
      type_document_id: [''],
      belt_id: [''],
      academy_id: [''],
      federation_id: [''],
      association_id: [''],
    });
  }

  getFederations(){
    this.apiService.getData("athlete/federations")
    .subscribe({
      next: (res:any) => {
        this.federations = res
      },
      error: (err) => console.log(err),
      complete: () => {}
    })
  }

  getAssociation(federation_id:any){
    this.apiService.getData(`athlete/associations/${federation_id}`)
    .subscribe({
      next: (res:any) => {
        this.associations = res
      },
      error: (err) => console.log(err),
      complete: () => {}
    })
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

  getTypesDocument() {
    this.apiService.getData('athlete/typesdocument')
      .subscribe({
        next: (res:any) => {
          this.typesDocument = res;
        },
        error: (err) => console.log(err),
        complete: () => {}
      });
  }

  getBelts(federation_id:any) {
    this.apiService.postData('athlete/belts', {
      federation_id
    })
      .subscribe({
        next: (res:any) => {
          this.belts = res;
        },
        error: (err) => console.log(err),
        complete: () => {}
      });
  }

  getAcademies(){
    this.apiService.getData('athlete/academies')
      .subscribe({
        next: (res:any) => {
          this.academies = res;
        },
        error: (err) => console.log(err),
        complete: () => {}
      });
  }

  getOptions(federation_id:any){
    this.getBelts(federation_id)
    this.getAssociation(federation_id)
  }

  onSubmit() {
      this.apiService.postData("athlete/register", this.formGroup.value)
      .subscribe({
        next: (res:any) => {
          console.log(res)
          // this.sessionService.setItem('token', res.token)
          // this.sessionService.setItem('user', JSON.stringify(res.user) )
          this.router.navigate(['signin'])
        },
        error: (err) => {
          this.alertsService.showAlert("Error!", err.error.message, 'error')
        },
        complete: () => {
          // if(this.navigationService.getPreviousUrl() && this.navigationService.getPreviousUrl().includes('/event/') ){
          //   this.location.back()
          // } else {
          //   this.router.navigate(['federation',this.sessionService.getUser().federation.id]);
          // }
        }

      })
    }

}
