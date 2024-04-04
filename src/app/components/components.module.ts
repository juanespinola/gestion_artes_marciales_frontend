import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NavItemComponent } from './sidebar/nav-item/nav-item.component';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableComponent,
    FormComponent,
    SidebarComponent,
    HeaderComponent,
    NavItemComponent
  ],
  exports: [
    CommonModule,
    TableComponent,
    FormComponent,
    SidebarComponent,
    HeaderComponent,
    NavItemComponent
  ]
})
export class ComponentsModule { }
