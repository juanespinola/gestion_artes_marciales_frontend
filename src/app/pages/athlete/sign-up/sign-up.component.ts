import { Component } from '@angular/core';
import { MaterialModule } from '../component/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../utils/api.service';
import { SessionService } from '../../../services/session.service';
import { AlertsService } from '../../../services/alerts.service';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router,
    private sessionService: SessionService,
    private alertsService: AlertsService,
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService
  ){

    
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }


  onSubmit() {
    this.apiService.postData("athlete/register", this.formGroup.value)
    .subscribe({
      next: (res:any) => {
        console.log(res)

      },
      error: (err) => {
        this.alertsService.showAlert("Error!", err.error.message, 'error')
      },

    })
    }

}
