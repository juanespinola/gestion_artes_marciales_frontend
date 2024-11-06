import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../components/material.module';
import { ComponentsModule } from '../../components/components.module';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../utils/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../../../../services/alerts.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sanction',
  standalone: true,
  imports: [
    MaterialModule,
    ComponentsModule,
  ],
  templateUrl: './sanction.component.html',
  styleUrl: './sanction.component.scss'
})
export class SanctionComponent {
  collection:any = "sanction"
  headers = [
    '#', 
    "description", 
    // "comments", 
    "actions"
  ];
  columns = [
      { title:"#", key: 'id', order: true },
      { title:"description", key: 'description', order:false },
      // { title:"comments", key: 'comments', order:false },
    ];

    elements:any;
  dataSource: any;
  
  constructor(
    public dialog: MatDialog, 
    private apiService: ApiService,
    private router: Router,
    private alertsService: AlertsService,
    private route: ActivatedRoute, 
    ){

    }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


    ngAfterViewInit() {
      this.getAll()
    }


  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateAction(id:any): void {
    console.log(id)
    this.router.navigate(["admin","athletes", this.route.snapshot.params['athlete_id'],"sanction", "edit", id]);
  }

  deleteAction(id:any): void {
  
  }

  createAction(): void {
    this.router.navigate(["admin","athletes", this.route.snapshot.params['athlete_id'],"sanction","add"]);
  }


  getAll() {
    this.apiService.postData(this.collection , {
      "athlete_id": this.route.snapshot.params['athlete_id']
    })
    .subscribe({
      next:(res:any) => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:(error) => {
        console.log(error)
        this.alertsService.showAlert("Error!", error.statusText, 'error')
      }
    });
  }
}
