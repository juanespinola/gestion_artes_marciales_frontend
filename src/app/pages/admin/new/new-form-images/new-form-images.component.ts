import { Component } from '@angular/core';
import { MaterialModule } from '../../components/material.module';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../utils/api.service';
import { AlertsService } from '../../../../services/alerts.service';

@Component({
  selector: 'app-new-form-images',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-form-images.component.html',
  styleUrl: './new-form-images.component.scss'
})
export class NewFormImagesComponent {
  formGroup: UntypedFormGroup | any;
  collection = "medianew"
  name_file_control: any;
  type_control: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private alertsService: AlertsService
  ) { }


  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      file: new FormControl(''),
      // route_file: [''],
      type: new FormControl(''),
      new_id: this.route.snapshot.params['id']
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


  onSubmit(event:any, type: string) {
    event.preventDefault();
    
    let id = this.route.snapshot.params['id']
    const formData = new FormData()
    formData.append('file', event.target.files[0])
    formData.append('type', type)
    formData.append('new_id', id)

       
    if (id) {
      this.apiService.postData(this.collection, formData)
        .subscribe((res:any) => {
          console.log(res)
          this.alertsService.showAlert("Correcto!", "Imagen Subida Correctamente", "success")      
        });
    } 
  }


  onBack() {
    this.router.navigate(['admin', 'new']);
  }

  // selectFile(event: any): void {
  //   this.name_file_control = event.target.files[0]
  // }
}
