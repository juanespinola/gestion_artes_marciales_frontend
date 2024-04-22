import { Component } from '@angular/core';
import { ComponentsModule } from '../../../components/components.module';
import { GroupCategoryFormComponent } from './group-category-form/group-category-form.component';

@Component({
  selector: 'app-group-category',
  standalone: true,
  imports: [
    ComponentsModule,
    GroupCategoryFormComponent
  ],
  templateUrl: './group-category.component.html',
  styleUrl: './group-category.component.scss'
})
export class GroupCategoryComponent {
  collection:any = "groupcategory"
  headers = ['#', "Descripcion", "Categoria", "Valor Inicial", "Valor Final", "actions"];
  columns = [
      { title:"#", key: 'id', order: true },
      { title:"Descripcion", key: 'group_category', order:false },
      { title:"Categoria", key: 'category.description', order:false },
      { title:"Valor Inicial", key: 'initial_value', order:false },
      { title:"Valor Final", key: 'final_value', order:false },
    ];
}
