import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../components/material.module';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../utils/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../../../../services/alerts.service';
import { SafeUrlPipe } from '../../../../safe-url.pipe';

@Component({
  selector: 'app-minor-authorization-form',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SafeUrlPipe
  ],
  templateUrl: './minor-authorization-form.component.html',
  styleUrl: './minor-authorization-form.component.scss'
})
export class MinorAuthorizationFormComponent {
  formGroup: UntypedFormGroup | any;
  collection = "minor_authorization"
  name_file_control: any;
  type_control: any;
  route_file: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private alertsService: AlertsService,
  ) { }


  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      file: new FormControl(''),
      authorized: [''],
    });
    this.createForm();
  }


  createForm() {
    let id = this.route.snapshot.params['id']
    if (id) {
      this.apiService.getData(this.collection + `/${id}`)
        .subscribe({
          next: (res: any) => {
            console.log(res)
            this.formGroup.patchValue({
              file: res.route_file,
              authorized: res.authorized,
            });
            this.route_file = res.route_file;
          },
          error: (err) => console.log(err),
          complete: () => { }
        });
    }
  }


  onSubmit() {
    let id = this.route.snapshot.params['id']
       
    if (id) {
      console.log(this.formGroup.value)
      this.apiService.putData(this.collection, id, this.formGroup.value)
      .subscribe((res:any) => {
        console.log(res)
        this.alertsService.showAlert("Correcto!", "Registro Actualizado Correctamente", "success")      
      });
    } 
  }


  onBack() {
    this.router.navigate(['admin', 'minor_authorization']);
  }
}
