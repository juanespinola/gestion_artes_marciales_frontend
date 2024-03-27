import {AfterViewInit, Component, ViewChild, Input} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'; 
import { FormComponent } from '../form/form.component';
import { ApiService } from '../../utils/api.service';
import { Router } from '@angular/router';
import { AlertsService } from '../../services/alerts.service';


@Component({
  selector: 'app-table',
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
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit {

  @Input() collection = '';
  @Input() headers: any[] = [];
  @Input() columns: any[] = [];
  @Input() filters: any[] = [];

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
    this.route.navigate([this.collection + "/edit", id]);

    // const dialogRef = this.dialog.open(FormComponent, {
    //   data: {
    //     fields: this.columns
    //   },
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('despues de cerrar',result)
    // })
  }

  deleteAction(id:any): void {
    console.log(id)
  
  }

  createAction(): void {
    this.route.navigate([this.collection + "/add"]);
  }

  getAll() {
    this.apiService.getData(this.collection)
    .subscribe({
      next:(res:any) => {
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
