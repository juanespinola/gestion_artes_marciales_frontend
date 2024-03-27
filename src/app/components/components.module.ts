import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableComponent,
    FormComponent,
    SidebarComponent
  ],
  exports: [
    CommonModule,
    TableComponent,
    FormComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
