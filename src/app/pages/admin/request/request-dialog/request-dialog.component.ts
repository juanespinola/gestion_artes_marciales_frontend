import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../utils/api.service';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../components/material.module';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-request-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule
  ],
  templateUrl: './request-dialog.component.html',
  styleUrl: './request-dialog.component.scss',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class RequestDialogComponent {
  
  formGroup:FormGroup;
  editorRequestText: Editor;
  typesrequest:any = []

  constructor
  (
    public dialogRef: MatDialogRef<RequestDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
  ){
  
    this.editorRequestText = new Editor();
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      date_request: ['', Validators.required],
      request_type_id: ['', Validators.required],
      request_text: ['', Validators.required],
      requested_by: this.data.user_email,
      federation_id: this.data.federation_id,
      association_id: this.data.association_id
    });
    this.getTypeRequest()
  }

  ngOnDestroy(): void {
    this.editorRequestText.destroy();
  }

  onSubmit(){
    this.apiService.postData('requestautorization', this.formGroup.value)
    .subscribe( (res:any) => {
         
    });

    this.dialogRef.close({
      event: "success"
    })

  }

  getTypeRequest() {
    this.apiService.getData('typerequest')
      .subscribe({
        next: (res:any) => {
          this.typesrequest = res
        },
        error: (err) => console.log(err),
        complete: () => {}
      });
  }
}
