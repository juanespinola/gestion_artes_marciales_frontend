import {AfterViewInit, Component, ViewChild, Input} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'; 
import { ApiService } from '../../utils/api.service';
import { Router } from '@angular/router';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [    
    MatTableModule, 
    MatSortModule,
    MatPaginatorModule, 
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
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
    
    this.headers = ["name", "email", "roles",  "permissions" ,"actions"];
    // this.columns = [];
  }
  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.getAll()
  }


  announceSortChange(sortState: Sort) {
    // console.log(sortState.direction)
  }

  updateAction(id:any): void {
    console.log(id)
    this.route.navigate(["users/edit", id]);
  }

  deleteAction(id:any): void {
    console.log(id)
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


const ELEMENT_DATA  = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
