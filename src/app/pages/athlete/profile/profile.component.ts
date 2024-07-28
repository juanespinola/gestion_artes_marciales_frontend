import { Component } from '@angular/core';
import { MaterialModule } from '../component/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../utils/api.service';
import { SessionService } from '../../../services/session.service';
import { AlertsService } from '../../../services/alerts.service';
import { BeltHistoryDialogComponent } from './belt-history-dialog/belt-history-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BeltHistoryDetailDialogComponent } from './belt-history-detail-dialog/belt-history-detail-dialog.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  formGroup: FormGroup;
  athlete:any = {};
  countries:any = [];
  cities:any = [];
  typesDocument:any = [];
  belts:any = [];
  beltshistory:any = [];
  academies:any = [];


  constructor( 
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router,
    private sessionService: SessionService,
    private alertsService: AlertsService,
    public dialog: MatDialog
  ){  
    this.athlete = this.sessionService.getUser()
    this.getProfile();
    this.getCountries();
    this.getTypesDocument()
    this.getBelts()
    this.getBeltsHistory()
    this.getAcademies()
  }

  ngOnInit() {
   
    console.log(this.athlete);
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      document: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required],
      country_id: ['', Validators.required],
      city_id: ['', Validators.required],
      type_document_id: ['', Validators.required],
      belt_id: ['', Validators.required],
      academy_id: ['', Validators.required],
    });
  }

  getProfile(){
    this.apiService.getData("athlete/profile")
    .subscribe({
      next: (res:any) => {

        this.formGroup.patchValue({
          name: res.name,
          email: res.email,
          document: res.document,
          phone: res.phone,
          gender: res.gender,
          birthdate: res.birthdate,
          country_id: res.country_id,
          city_id: res.city_id,
          type_document_id: res.type_document_id,
          belt_id:res.belt_id,
          academy_id:res.academy_id
        });

        this.getCities(res.city_id)
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
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

  //para saber el cinturon actual
  getBelts() {
    this.apiService.postData('athlete/belts', {
      federation_id: this.athlete.federation.id
    })
      .subscribe({
        next: (res:any) => {
          this.belts = res;
        },
        error: (err) => console.log(err),
        complete: () => {}
      });
  }

  getBeltsHistory(){
    this.apiService.getData('athlete/belthistory')
      .subscribe({
        next: (res:any) => {
          this.beltshistory = res;
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


  addBeltHistoryDialog(){
    const dialogRef = this.dialog.open(BeltHistoryDialogComponent, {
      data: {
        athlete_id: this.athlete.id,
        federation_id: this.athlete.federation.id
      },
    })
    dialogRef.afterClosed()
      .subscribe((result: any) => {
          this.getBeltsHistory()
          this.getProfile()
      })
  }

  viewBeltHistoryDialog(belthistory:any){
    const dialogRef = this.dialog.open(BeltHistoryDetailDialogComponent, {
      data: {
        belthistory
      },
    })
    dialogRef.afterClosed()
      .subscribe((result: any) => {
        
      })
  }

  onSubmit() {
    console.log(this.formGroup.value)
      this.apiService.postData("athlete/profile", this.formGroup.value)
      .subscribe((res:any) => {
        console.log(res)
        // this.router.navigate([])
      });
  }

}
