import { Component, Inject } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card'; 
import { FormBuilder, FormControl, FormGroup,  FormsModule,  ReactiveFormsModule,  Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  formGroup: FormGroup;
  result: any
  fieldsForm: any
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fields: []}
    ) { }

  ngOnInit() {
    this.fieldsForm = this.data.fields
    this.createForm();
  }


  createForm() {
    this.formGroup = this.formBuilder.group({})
    this.fieldsForm.forEach( (field:any) => {
      this.formGroup.addControl(field.key, new FormControl('', [Validators.required]))
    });
  }


  onSubmit(result: any) {
    this.result = result;
    console.log(result)
    this.dialogRef.close({event: 'estamos devolviendo algo'})
  }
}
