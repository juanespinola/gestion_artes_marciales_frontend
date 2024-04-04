import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../utils/api.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SessionService } from '../../services/session.service';
import { AlertsService } from '../../services/alerts.service';
import {MatButtonModule} from '@angular/material/button'; 
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  formGroup: FormGroup;
  collection: string = 'login'

  constructor (
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router,
    private sessionService: SessionService,
    private alertsService: AlertsService
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
      complete: () => this.router.navigate(["/"])
    });
  }

  prueba(){
    this.alertsService.showAlert("hola", "hola", 'success')
  }
  
}
