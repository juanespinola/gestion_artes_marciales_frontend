import { Component } from '@angular/core';
import { MaterialModule } from '../../components/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../utils/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, NgxEditorModule } from 'ngx-editor';
import moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { SessionService } from '../../../../services/session.service';

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule
  ],
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.scss',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class RequestFormComponent {
  editorRequestText: Editor;
  editorResponseText: Editor;
  collection: any = "requestautorization";

  formRequest: any = new FormData();
  formGroup:FormGroup;
  user: any; 


  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.editorRequestText = new Editor();
    this.editorResponseText = new Editor();
    this.user = this.sessionService.getUser();
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      status: ['', Validators.required],
      // date_request: ['', Validators.required],
      date_response: ['', Validators.required],
      response_text: ['', Validators.required],
      request_text: [''],
      federation_id: null,
      association_id: null,
      athlete_id: null,
      approved_by: null,
      requested_by: null,
      rejected_by: null,
    });
    this.createForm();
  }

  ngOnDestroy(): void {
    this.editorRequestText.destroy();
    this.editorResponseText.destroy();
  }

  createForm() {
    let id = this.route.snapshot.params['id']
    if (id) {
      this.apiService.getData(this.collection + `/${id}`)
        .subscribe({
          next: (res: any) => {
            // console.log(res)
            this.formGroup.patchValue({
              status: res.status,
              // date_request: res.date_request,
              request_text: res.request_text,
              response_text: res.response_text,
              date_response: moment(res.date_response),
              federation_id: res.federation_id,
              association_id: res.association_id,
              athlete_id: res?.athlete_id,
            })

            this.formRequest.append('id', res.id)
            this.formRequest.append('status', res.status)   
            this.formRequest.append('date_request', res.date_request)   
            this.formRequest.append('requested_by', res.requested_by) 
            this.formRequest.append('approved_by', res.approved_by) 
            this.formRequest.append('rejected_by', res.rejected_by) 
            // this.formRequest.append('athlete_id', res.athlete_id)
            // this.editorRequestText.setContent(res.request_text)
            // this.editorResponseText.setContent(res.response_text)


          },
          error: (err) => console.log(err),
          complete: () => { }
        });
    }
  }

  changeStatus(){
    switch (this.formGroup.value.status) {
      case "aprobado":
        console.log(this.user)
        this.formGroup.patchValue({
          approved_by: this.user.id,
          rejected_by: null,
        })
        break;
      case "rechazado":
        console.log('b')
        this.formGroup.patchValue({
          approved_by: null,
          rejected_by: this.user.id
        })
        break;
    }
  }

  onSubmit(){
   // no cambia porque en la vista no estan los formcontrolname, fijarse
    let id = this.route.snapshot.params['id'];
    this.changeStatus()
    if(id){
      console.log(this.formGroup.value)
      this.apiService.putData(this.collection, id, this.formGroup.value)
      .subscribe((res:any) => {
        console.log(res)
      });
    }
  }

  onBack(){
    this.router.navigate(["admin", "request"]);
  }
}
