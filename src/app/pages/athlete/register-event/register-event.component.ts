import { Component } from '@angular/core';
import { MaterialModule } from '../../admin/components/material.module';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../utils/api.service';
import { SessionService } from '../../../services/session.service';
import { APP_ROUTES } from '../../../routes';
import { AlertsService } from '../../../services/alerts.service';
import { ConfirmInscriptionDialogComponent } from './confirm-inscription-dialog/confirm-inscription-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register-event',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register-event.component.html',
  styleUrl: './register-event.component.scss'
})
export class RegisterEventComponent {
  
  collection = APP_ROUTES.ATHLETE_ENTRYCATEGORIES
  formGroup: FormGroup;

  entriescategories:any = [];
  entry:any = [];

  athlete:any;

  selectEntryForPayment: any = [];
  entryForPaymentCtrl = new FormControl([], Validators.required);

  total: number = 0;

  constructor (
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router,
    private sessionService: SessionService,
    private alertsService: AlertsService,
    public dialog: MatDialog
  ){
    this.athlete = this.sessionService.getUser()
    
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({ 
      selectEntryForPayment : this.entryForPaymentCtrl
    });

    this.getEntriesCategories()
    
  }

  getEntriesCategories(){
    this.apiService.getData(this.collection)
    .subscribe({
      next: (res:any) => {
        console.log( res )
        this.entriescategories = res;
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
  }

  

  onSubmit() {
    console.log(this.formGroup.value)
      this.apiService.postData("athlete/inscription/create", this.formGroup.value)
      .subscribe({
        next: (res:any) => {
          this.alertsService.showAlert("Correcto!", "Registro correcto!", 'success')
          this.router.navigate(['event', this.route.snapshot.params['event_id'], 'payment']);
        },
        error: (err) =>  err.status == 400 && this.alertsService.showAlert("Error!", err.error.messages, 'error'),
      });
    // }
  }

  onBack(){
    this.router.navigate(['event', this.route.snapshot.params['event_id']]);
  }


  asArray(array: any): any {
    return array
  }


  getSelectEntry(entry:any){

    const count = this.selectEntryForPayment.length;
    const hasAbsoluto = this.selectEntryForPayment.some( (e:any) => (e.name).toLowerCase() === 'absoluto');

    
    // Si ya hay un entry y el nuevo entry no tiene name "absoluto", no lo agrega
    if(hasAbsoluto){
      this.alertsService.showAlert("Error!", "Ya te encuentras Registrado en Absoluto", 'warning')
      return;
    }

    if (count >= 1 && (entry.name).toLowerCase() !== 'absoluto') {
      this.alertsService.showAlert("Error!", "Ya te encuentras registrado en una Categoría", 'warning')
        return;
    }

    this.selectEntryForPayment.push(entry);
    this.total += entry.tariff_inscription.price;
    this.entryForPaymentCtrl.setValue(this.selectEntryForPayment)


  }

  deleteSelectEntry(entry:any){
    const index = this.selectEntryForPayment.findIndex((e:any) => e.id === entry.id);
    
    console.log(index)

    if (index !== -1) {
        this.selectEntryForPayment.splice(index, 1);
        this.total -= entry.tariff_inscription.price;
        this.entryForPaymentCtrl.setValue(this.selectEntryForPayment)
        this.alertsService.showAlert("Correcto!", "Categoría eliminada correctamente!", 'success')
    } else {
      this.alertsService.showAlert("Error!", "Categoría no encontrada", 'error')
    }

  }

  confirmPayment(){
    const dialogRef = this.dialog.open(ConfirmInscriptionDialogComponent)
    dialogRef.afterClosed()
      .subscribe((result: any) => {
        if (result.event === 'confirm') {
          this.onSubmit()
        }
      })
  }






}
