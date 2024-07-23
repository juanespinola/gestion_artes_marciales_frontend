import { Component } from '@angular/core';
import { MaterialModule } from '../../component/material.module';
import { ComponentsModule } from '../../component/components.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../utils/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../../../../services/alerts.service';
import moment from 'moment';
import { EventBracketComponent } from '../event-bracket/event-bracket.component';

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
  
  headers: any[] = [];
  footers: any[] = [];

  event_id: any;
  elements:any;
  dataSource: any;

  entriescategories:any = [];
  listEntryCategories:any = [];
  listFilterAthlete: any = [];
  
  constructor(
    public dialog: MatDialog, 
    private apiService: ApiService,
    private alertsService: AlertsService,
    private activatedRoute: ActivatedRoute,
    ){
     
      this.event_id = this.activatedRoute.snapshot.paramMap.get('event_id')
      this.headers = [
        '#',  
        'athlete',
        'age',
        'team',
        'weight',
      ];

      this.footers = [
        'athlete',
        'age',
      ]

    }

    ngAfterViewInit() {
      this.getAll()
    }

    applyFilter(filterValue: string): void {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }   

    getAll() {
      this.apiService.getData(`events/${this.event_id}/registered`)
      .subscribe({
        next:(res:any) => {
          // console.log(res)
          this.entriescategories = res;
        },
        error:(error:any) => {
          console.log(error)
          this.alertsService.showAlert("Error!", error.statusText, 'error')
        }
      });
    }

    convertMatTable(inscriptions:any){
      this.dataSource = new MatTableDataSource(inscriptions)
      return this.dataSource
    }
    
    filterArray(listCategories:any, inscriptions:any) {
      inscriptions = inscriptions.filter( (ins:any) => ins.tariff_inscription.entry_category_id == listCategories.id)
      this.dataSource = new MatTableDataSource(inscriptions)
      return this.dataSource
    }

    asArray(array:any){
      this.listEntryCategories = array
      return this.listEntryCategories
    }
    

    getSubKeys(key: any): any {
      return key;
    }

    getAge(birthdate: any) : any {
      return moment().diff(birthdate, 'years')
    }

    

    getTotalAthlete(athlete: any){
      return athlete.length
    }

    matchBrackets(entry_category_id:any){
      const dialogRef = this.dialog.open(EventBracketComponent, {
        data: {
          entry_category_id,
          event_id:this.event_id
        },
        height: "90%",
        width: "80%"
      })
      dialogRef.afterClosed()
        .subscribe((result: any) => {
          // if (result.event == 'success') {
          //   this.getAll();
          // }
        })
    }

    
}
