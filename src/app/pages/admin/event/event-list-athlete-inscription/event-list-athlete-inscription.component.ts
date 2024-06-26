import { Component, ViewChild, viewChild } from '@angular/core';
import { MaterialModule } from '../../components/material.module';
import { ComponentsModule } from '../../components/components.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../utils/api.service';
import { Router } from '@angular/router';
import { AlertsService } from '../../../../services/alerts.service';
import moment from 'moment';
import { WeightDialogComponent } from './weight-dialog/weight-dialog.component';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-event-list-athlete-inscription',
  standalone: true,
  imports: [
    MaterialModule,
    ComponentsModule,
  ],
  templateUrl: './event-list-athlete-inscription.component.html',
  styleUrl: './event-list-athlete-inscription.component.scss'
})
export class EventListAthleteInscriptionComponent {
  // accordion = viewChild.required(MatAccordion);
  collection:any = ""
  headers: any[] = [];
  filters: any[] = [];

  elements:any;
  dataSource: any;

  entriescategories:any = [];

  constructor(
    public dialog: MatDialog, 
    private apiService: ApiService,
    private route: Router,
    private alertsService: AlertsService
    ){
      this.collection = "inscription"
    
      this.headers = [
        '#',  
        'athlete',
        'age',
        'team',
        'weight',
        "actions"
      ];

    }

    ngOnInit(){
      // accordion().openAll()
    }

    ngAfterViewInit() {
     
      this.getAll()
    }

    applyFilter(filterValue: string): void {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    updateAction(id:any): void {
      console.log(id)
      this.route.navigate(["admin","event","edit", id]);
    }

    deleteAction(id:any): void {
      // const dialogRef = this.dialog.open(DeleteDialogComponent)
      // dialogRef.afterClosed()
      //   .subscribe((result: any) => {
      //     if (result.event === 'success') {
      //       this.apiService.deleteData(this.collection, id)
      //         .subscribe({
      //           next: (res: any) => {
      //             this.dataSource.data = this.dataSource.data.filter((value: any) => value.id !== id);
      //             this.alertsService.showAlert("Correcto!", res.messages, 'success')
      //           },
      //           error: (error) => {
      //             console.log(error)
      //             this.alertsService.showAlert("Error!", error.statusText, 'error')
      //           }
      //         })
      //     }
      //   })
    }

    createAction(): void {
      this.route.navigate(["admin","event","add"]);
    }
    

    getAll() {
      this.apiService.getData(this.collection)
      .subscribe({
        next:(res:any) => {
          console.log(res)
          this.entriescategories = res;
        },
        error:(error) => {
          console.log(error)
          this.alertsService.showAlert("Error!", error.statusText, 'error')
        }
      });
    }
    
    asArray(array: any): any {
      
      this.dataSource = new MatTableDataSource(array)
      return array
    }


    getSubKeys(key: any): any {
      return key;
    }

    getAge(birthdate: any) : any {
      return moment().diff(birthdate, 'years')
    }

    updateWeight(inscription_id: any){
      const dialogRef = this.dialog.open(WeightDialogComponent, {
        data: {
          inscription_id
        }
      })
      dialogRef.afterClosed()
        .subscribe((result: any) => {
          if (result.event == 'success') {
            this.getAll();
          }
        })
    }



}
