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

interface Belt {
  id: number;
  color: string;
  federation_id: number;
}

interface EntryCategory {
  id: number;
  name: string;
  min_age: number;
  max_age: number;
  min_weight: string;
  max_weight: string;
  belt_id: number;
  gender: string;
  clothes: string;
  event_id: number;
  minor_category: boolean;
  belt: Belt;
  match_bracket: any[];
}

interface TariffInscription {
  id: number;
  entry_category_id: number;
  price: number;
  entry_category: EntryCategory;
  inscriptions: Athlete[];
}

interface Athlete {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  country_id: number;
  city_id: number;
  type_document_id: number;
  document: string;
  phone: string;
  gender: string;
  birthdate: string;
  profile_image: string | null;
  belt_id: number | null;
  type: string;
  academy_id: number | null;
}

interface Registration {
  id: number;
  athlete_id: number;
  event_weight: number | null;
  valid_weight: boolean;
  status: string;
  athlete: Athlete;
  tariff_inscription: TariffInscription;
 
}


interface Data {
  [minor: string]: {
    [gender: string]: {
      [beltColor: string]: {
        [categoryName: string]: Registration[];
      };
    };
  };
}

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

  totalAthlete: number = 0;
  matchbrackets: number = 0;

  elements:any;
  dataSource: any;

  entriescategories:Data = {};
  listEntryCategories:any = [];
  listFilterAthlete: any = [];
  selection = new SelectionModel<any>(true, []);

  event:any;
  
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
      this.getEvent()
      this.getAll()
    }

    ngAfterViewInit() {
      
     
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
    
    getEvent(){
      let event_id = this.route.snapshot.params['id'];
      this.apiService.getData(`event/${event_id}`)
      .subscribe({
        next:(res:any) => {
          this.event = res;
        },
        error:(error:any) => {
          console.log(error)
          this.alertsService.showAlert("Error!", error.statusText, 'error')
        }
      })
    }

    getAll() {
      let event_id = this.route.snapshot.params['id'];
      this.apiService.postData(`${this.collection}`,{
        event_id
      })
      .subscribe({
        next:(res:any) => {
          // console.log(res);
          this.entriescategories = res;
          this.convertData(res)
        },
        error:(error:any) => {
          console.log(error)
          this.alertsService.showAlert("Error!", error.statusText, 'error')
        }
      });
    }

    convertMatTable(inscriptions:any){
      console.log(inscriptions)
      this.dataSource = new MatTableDataSource(inscriptions.athlete)
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

    checkMathBracket(registration:any){
      return registration.match_bracket.length == 0 ? true:false
    }

    generateMatchBrackets(inscriptions:any) {

      let event_id = this.route.snapshot.params['id'];
      const dialogRef = this.dialog.open(GenerateMatchBracketDialogComponent, {
        data: {
          athlete: inscriptions.tariff_inscription.inscriptions,
          entry_category_id: inscriptions.tariff_inscription.entry_category_id,
          event: this.event,
          event_id, 
        }
      })
      dialogRef.afterClosed()
        .subscribe((result: any) => {
          // if (result.event == 'success') {
            this.getAll();
          // }
        })
    }

    viewMatchBrackets(inscriptions: any){
      let event_id = this.route.snapshot.params['id'];
      const dialogRef = this.dialog.open(ViewMatchBracketDialogComponent, {
        data: {
          entry_category_id: inscriptions.tariff_inscription.entry_category_id,
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

    convertData(entriescategories:Data){
      // let data: Data = this.entriescategories;
      
      Object.keys(entriescategories).forEach(minorCategoryKey => {
        const minorCategory = entriescategories[minorCategoryKey];
        
        Object.keys(minorCategory).forEach(genderKey => {
          const genderCategory = minorCategory[genderKey];
          
          Object.keys(genderCategory).forEach(beltColorKey => {
            const beltCategory = genderCategory[beltColorKey];
            
            Object.keys(beltCategory).forEach(categoryNameKey => {
              const registrations = beltCategory[categoryNameKey];
              
              registrations.forEach((registration:Registration) => {
                //   // Aquí puedes procesar cada registro
                // this.dataSource = new MatTableDataSource(registration.tariff_inscription.inscriptions)
                // console.log(registration.tariff_inscription.inscriptions);
                
                
              });
            });
          });
        });
      });
      
    }

    getMinorCategory(): string[] {
      return Object.keys(this.entriescategories);
    }
    
    getGenders(year: string): string[] {
      return Object.keys(this.entriescategories[year]);
    }
    
    getBeltColors(year: string, gender: string): string[] {
      return Object.keys(this.entriescategories[year][gender]);
    }
    
    getCategoryNames(year: string, gender: string, beltColor: string): string[] {
      return Object.keys(this.entriescategories[year][gender][beltColor]);
    }
    
    getRegistrations(year: string, gender: string, beltColor: string, categoryName: string): Registration[] {
      // this.dataSource = new MatTableDataSource(this.entriescategories[year][gender][beltColor][categoryName]);
      // console.log(this.entriescategories[year][gender][beltColor][categoryName])
      return this.entriescategories[year][gender][beltColor][categoryName];
    }

    getInscriptions(inscriptions: any){
      this.dataSource = new MatTableDataSource(inscriptions)
      return inscriptions;
    }

}
