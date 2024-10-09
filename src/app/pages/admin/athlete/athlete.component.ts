import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../components/material.module';
import { ComponentsModule } from '../components/components.module';
import { ApiService } from '../../../utils/api.service';
import { Router } from '@angular/router';
import { AlertsService } from '../../../services/alerts.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SanctionDialogComponent } from './sanction-dialog/sanction-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-athlete',
  standalone: true,
  imports: [
    MaterialModule,
    ComponentsModule,
  ],
  templateUrl: './athlete.component.html',
  styleUrl: './athlete.component.scss'
})
export class AthleteComponent {
  collection:any = ""
  headers: any[] = [];
  filters: any[] = [];
  elements:any;
  dataSource: any;

  constructor( 
    private apiService: ApiService,
    private route: Router,
    private alertsService: AlertsService,
    private dialog: MatDialog
    ){
      this.collection = "athlete"
    
      this.headers = [
        '#', 
        "name", 
        "belt",
        "academy",
        "country",
        "city",
        "actions"
      ];
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    ngAfterViewInit() {
      this.getAll()
    }

    applyFilter(filterValue: string): void {
      this.dataSource.filter = filterValue.trim().toLowerCase();
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


    sanctionAction(athlete_id:any){
      const dialogRef = this.dialog.open(SanctionDialogComponent, {
        data: {
          athlete_id
        }
      })
      dialogRef.afterClosed()
        .subscribe((result: any) => {
          if (result.event == 'success') {
            // this.getAllRequest()
          }
        })
    }
}
