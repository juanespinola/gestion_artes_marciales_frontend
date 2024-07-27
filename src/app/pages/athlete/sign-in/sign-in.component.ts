import { Component } from '@angular/core';
import { MaterialModule } from '../../admin/components/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from '../../../utils/api.service';
import { SessionService } from '../../../services/session.service';
import { AlertsService } from '../../../services/alerts.service';
import { Location } from '@angular/common';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  formGroup: FormGroup;
  collection: string = 'athlete/login'
  federations: any = [];
  federation_id: any = ""

  constructor (
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router,
    private sessionService: SessionService,
    private alertsService: AlertsService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private navigationService: NavigationService
  ){}

  ngOnInit() {
    // console.log(this.navigationService.getPreviousUrl().includes('/event/'))
    this.getFederations();

    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      federation_id: [this.federation_id, Validators.required]
    });
  }

  onSubmit() {
    this.apiService.postData(this.collection, this.formGroup.value)
    .subscribe({
      next: (res:any) => {
        console.log(res)
        this.sessionService.setItem('token', res.token)
        this.sessionService.setItem('user', JSON.stringify(res.user) )
      },
      error: (err) => {
        this.alertsService.showAlert("Error!", err.error.message, 'error')
      },
      complete: () => {
        if(this.navigationService.getPreviousUrl() && this.navigationService.getPreviousUrl().includes('/event/') ){
          this.location.back()
        } else {
          this.router.navigate(['federation',this.sessionService.getUser().federation.id]);
        }
      }
      
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
  
}
