import { Component } from '@angular/core';
import { ComponentsModule } from '../component/components.module';
import { MaterialModule } from '../component/material.module';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../utils/api.service';
import { AlertsService } from '../../../services/alerts.service';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-minor-authorization',
  standalone: true,
  imports: [
    ComponentsModule, 
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './minor-authorization.component.html',
  styleUrl: './minor-authorization.component.scss'
})
export class MinorAuthorizationComponent {
  formGroup: UntypedFormGroup | any;
  collection = "minor_authorization/uploaddocument"
  name_file_control: any;
  type_control: any;
  formData:any = new FormData()

  constructor(
    private formBuilder: UntypedFormBuilder,
    public route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private alertsService: AlertsService,
    private sessionService: SessionService
  ) { }


  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      file: new FormControl(''),
      // route_file: [''],
      // new_id: this.route.snapshot.params['id']
    });
    // this.createForm();
  }


  createForm() {
    let id = this.route.snapshot.params['id']
    if (id) {
      this.apiService.getData(this.collection + `/${id}`)
        .subscribe({
          next: (res: any) => {
            this.formGroup.patchValue({
              // title: res.title,
              // content: res.content,
              // status: res.status
            });
          },
          error: (err) => console.log(err),
          complete: () => { }
        });
    }
  }


  uploadDocument(event:any) {
    
    event.preventDefault();
    
    
    this.formData.append('file', event.target.files[0])
    this.formData.append('federation_id', this.sessionService.getUser().federation.id )


   
  }


  onBack() {
    // this.router.navigate(['admin', 'new']);
  }

  onSubmit(){
    this.apiService.postData(this.collection, this.formData)
    .subscribe((res:any) => {
      console.log(res)
      this.alertsService.showAlert("Correcto!", res.messages, "success")      
  });

  }


}
