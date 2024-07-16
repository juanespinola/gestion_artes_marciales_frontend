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
import { CdkColumnDef } from '@angular/cdk/table';
import { SelectionModel } from '@angular/cdk/collections';
import { UpdateMatchBracketDialogComponent } from './update-match-bracket-dialog/update-match-bracket-dialog.component';
import { ViewMatchBracketDialogComponent } from './view-match-bracket-dialog/view-match-bracket-dialog.component';


@Component({
  selector: 'app-event-list-athlete-inscription',
  standalone: true,
  imports: [
    MaterialModule,
    ComponentsModule,
  ],
  templateUrl: './event-list-athlete-inscription.component.html',
  styleUrl: './event-list-athlete-inscription.component.scss',
  providers: [
  ]
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
  listEntryCategories:any = [];
  listFilterAthlete: any = [];
  selection = new SelectionModel<any>(true, []);
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

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected(): any {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle(): void {
      this.isAllSelected()
        ? this.selection.clear()
        : this.dataSource.data.forEach((row: any) => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?:any): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected( row ) ? 'deselect' : 'select'} row ${
        row?.position + 1
      }`;
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
    // @if(listAthlete.id == inscription.tariff_inscription.entry_category_id){

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

    generateMatchBrackets(athlete:any) {
      let event_id = this.route.snapshot.params['id'];
      const dialogRef = this.dialog.open(GenerateMatchBracketDialogComponent, {
        data: {
          athlete: athlete.inscriptions,
          entry_category_id: athlete.entry_category_id,
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

    viewMatchBrackets(athlete: any){
      let event_id = this.route.snapshot.params['id'];
      const dialogRef = this.dialog.open(ViewMatchBracketDialogComponent, {
        data: {
          entry_category_id: athlete.entry_category_id,
          event_id, 
        },
        width: "80%",
        height: "60%"
      })
      dialogRef.afterClosed()
        .subscribe((result: any) => {
          // if (result.event == 'success') {
          //   this.getAll();
          // }
        })
    }

}
