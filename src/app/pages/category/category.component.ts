import { Component } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { CategoryFormComponent } from './category-form/category-form.component';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    ComponentsModule,
    CategoryFormComponent
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  collection:any = "category"
  headers = ['#', "Descripcion", "Deporte", "actions"];
  columns = [
      { title:"#", key: 'id', order: true },
      { title:"Descripcion", key: 'description', order:false },
      { title:"Deporte", key: 'sport.description', order:false }
    ];
}
