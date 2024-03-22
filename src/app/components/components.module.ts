import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableComponent,
    FormComponent
  ],
  exports: [
    CommonModule,
    TableComponent,
    FormComponent
  ]
})
export class ComponentsModule { }
