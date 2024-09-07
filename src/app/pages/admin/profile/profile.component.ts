import { Component } from '@angular/core';
import { MaterialModule } from '../components/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../utils/api.service';
import { SessionService } from '../../../services/session.service';
import { AlertsService } from '../../../services/alerts.service';
import { MatDialog } from '@angular/material/dialog';

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
  user:any = {};

  constructor(
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router,
    private sessionService: SessionService,
    private alertsService: AlertsService,
    public dialog: MatDialog
  ){
    this.user = this.sessionService.getUser()  
    this.getProfile();
  }

  ngOnInit(){
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  getProfile(){
    this.apiService.getData("profile")
    .subscribe({
      next: (res:any) => {
        this.formGroup.patchValue({
          name: res.name,
          email: res.email,
        });

      },
      error: (err) => console.log(err),
      complete: () => {}
    });
  }


  onSubmit() {
    console.log(this.formGroup.value)
      this.apiService.postData("profile", this.formGroup.value)
      .subscribe((res:any) => {
        console.log(res)
        // this.router.navigate([])
        this.alertsService.showAlert("Correcto!", res.messages, 'success')
      });
  }
  
}
