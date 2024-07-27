import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../component/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../utils/api.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-belt-history-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './belt-history-dialog.component.html',
  styleUrl: './belt-history-dialog.component.scss',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]

})
export class BeltHistoryDialogComponent {

  belts:any = [];
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BeltHistoryDialogComponent>, 
    public apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) {
    this.getBelts();
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({ 
      belt_id : ['', Validators.required],
      athlete_id: this.data.athlete_id,
      federation_id: this.data.federation_id,
      achieved : [''],
      promoted_by : [''],
    });
  }

  addBeltHistory() {
    this.apiService.postData('athlete/updatebelthistory', this.formGroup.value)
    .subscribe({
      next: (res: any) => {
        console.log(res)
        // this.belts = res;
      },
      error: (err) => console.log(err),
      complete: () => { }
    });
  }

  getBelts() {
    this.apiService.postData('athlete/belts', {
      federation_id: this.data.federation_id
    })
      .subscribe({
        next: (res:any) => {
          this.belts = res;
        },
        error: (err) => console.log(err),
        complete: () => {}
      });
  }

}
