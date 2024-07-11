import { Component, ViewChild, viewChild } from '@angular/core';
import { MaterialModule } from '../../components/material.module';
import { ComponentsModule } from '../../components/components.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../utils/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../../../../services/alerts.service';
import moment from 'moment';
import { WeightDialogComponent } from './weight-dialog/weight-dialog.component';
import { MatAccordion } from '@angular/material/expansion';
import { GenerateMatchBracketDialogComponent } from './generate-match-bracket-dialog/generate-match-bracket-dialog.component';

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
  footers: any[] = [];
  filters: any[] = [];

  elements:any;
  dataSource: any;

  entriescategories:any = [];
  listAthletes:any = [];

  constructor(
    public dialog: MatDialog, 
    private apiService: ApiService,
    private router: Router,
    private alertsService: AlertsService,
    public route: ActivatedRoute,
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

      this.footers = [
        'athlete',
        'actions'
      ]

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
      this.router.navigate(["admin","event","edit", id]);
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
      this.router.navigate(["admin","event","add"]);
    }
    

    getAll() {
      let event_id = this.route.snapshot.params['id'];
      this.apiService.postData(`${this.collection}`,{
        event_id
      })
      .subscribe({
        next:(res:any) => {
          // console.log(res)
          this.entriescategories = res;
        },
        error:(error) => {
          console.log(error)
          this.alertsService.showAlert("Error!", error.statusText, 'error')
        }
      });
    }
    
    asArray(array: any): any {
      console.log(array)
      // this.dataSource = new MatTableDataSource(array)
      this.listAthletes = array
      return this.listAthletes
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

    getTotalAthlete(athlete: any){
      return athlete.length
    }

    generateMatchBrackets(athlete: any) {
      let event_id = this.route.snapshot.params['id'];
      const dialogRef = this.dialog.open(GenerateMatchBracketDialogComponent, {
        data: {
          athlete,
          event_id, 
        }
      })
      dialogRef.afterClosed()
        .subscribe((result: any) => {
          // if (result.event == 'success') {
          //   this.getAll();
          // }
        })
    }

    chargeResults(athlete: any){
      console.log(athlete)
    }

}
