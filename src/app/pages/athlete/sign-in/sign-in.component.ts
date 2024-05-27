import { Component } from '@angular/core';
import { MaterialModule } from '../../admin/components/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from '../../../utils/api.service';
import { SessionService } from '../../../services/session.service';
import { AlertsService } from '../../../services/alerts.service';
import { APP_ROUTES } from '../../../routes';
import { Location } from '@angular/common';

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

  constructor (
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router,
    private sessionService: SessionService,
    private alertsService: AlertsService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ){}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
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
      error: (err) => console.log(err),
      complete: () => this.location.back()
      
    });
  }
  
}
