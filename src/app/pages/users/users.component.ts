import { Component, Injectable, ViewChild } from '@angular/core';
import {MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource, } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSort, Sort } from '@angular/material/sort';
import { ApiService } from '../../utils/api.service';
import { Router } from '@angular/router';
import { AlertsService } from '../../services/alerts.service';
import { MaterialModule } from '../../components/material.module';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../components/dialogs/delete-dialog/delete-dialog.component';



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [    
    MaterialModule,
    CommonModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  
  collection = 'users';
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
    this.collection = "user"
    
    this.headers = ["#","name", "email", "roles", "actions"];
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
    this.route.navigate(["users/edit", id]);
  }

  deleteAction(id:any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent)
    dialogRef.afterClosed()
      .subscribe((result: any) => {
        if (result.event === 'success') {
          this.apiService.deleteData(this.collection, id)
            .subscribe({
              next: (res: any) => {
                this.dataSource.data = this.dataSource.data.filter((value: any) => value.id !== id);
                this.alertsService.showAlert("Correcto!", res.messages, 'success')
              },
              error: (error) => {
                console.log(error)
                this.alertsService.showAlert("Error!", error.statusText, 'error')
              }
            })
        }
      })
  }

  createAction(): void {
    this.route.navigate(["users/add"]);
  }

  permissionsAction(id:any):void {
    console.log(id)
    this.route.navigate(["users/permissions", id])
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
