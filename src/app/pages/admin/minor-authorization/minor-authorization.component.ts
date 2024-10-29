import { Component, ViewChild } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../components/material.module';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../../utils/api.service';
import { Router } from '@angular/router';
import { AlertsService } from '../../../services/alerts.service';
import { MatTableDataSource } from '@angular/material/table';
import { MinorAuthorizationFormComponent } from './minor-authorization-form/minor-authorization-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-minor-authorization',
  standalone: true,
  imports: [
    MaterialModule,
    ComponentsModule
  ],
  templateUrl: './minor-authorization.component.html',
  styleUrl: './minor-authorization.component.scss'
})
export class MinorAuthorizationComponent {
  collection = '';
  headers: any[] = [];
  columns: any[] = [];
  filters: any[] = [];

  elements:any;
  dataSource: any;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog, 
    private apiService: ApiService,
    private route: Router,
    private alertsService: AlertsService
    ){
    this.collection = "minor_authorization"
    
    this.headers = ['#', "athlete", "user", "authorized","actions"];
    // this.columns = [];
  }
  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.getAll()
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  announceSortChange(sortState: Sort) {
    // console.log(sortState.direction)
  }

  updateAction(id:any): void {
    console.log(id)
    this.route.navigate(["admin","minor_authorization","edit", id]);
  }

  deleteAction(id:any): void {
  
  }

  createAction(): void {
    // this.route.navigate(["admin","users","add"]);
  }

  getAll() {
    this.apiService.getData(this.collection)
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
