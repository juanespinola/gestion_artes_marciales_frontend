import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../utils/api.service';
import { FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertsService } from '../../../../../services/alerts.service';
import { MaterialModule } from '../../../components/material.module';

@Component({
  selector: 'app-update-match-bracket-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './update-match-bracket-dialog.component.html',
  styleUrl: './update-match-bracket-dialog.component.scss'
})
export class UpdateMatchBracketDialogComponent {
  formGroup: FormGroup;
  matchbracket: any;
  typesvictory: any = [];
  athlete_id_winner: any;
  athlete_name: any;

  constructor(
    public dialogRef: MatDialogRef<UpdateMatchBracketDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertsService: AlertsService,
  ){
    console.log(data)
    this.matchbracket = data.matchbracket
    this.getTypeVictory();
  }

  ngOnInit() {
    
    this.formGroup = this.formBuilder.group({
      match_bracket_id: [this.matchbracket.id],
      score_one_athlete: [this.matchbracket.score_one_athlete, Validators.required],
      score_two_athlete: [this.matchbracket.score_two_athlete, Validators.required],
      quadrilateral: [this.matchbracket.quadrilateral, Validators.required],
      match_timer: [this.matchbracket.match_timer, Validators.required],
      victory_type_id: ['', Validators.required],
      athlete_id_winner: ['', Validators.required]
    });
  }

  onSubmit(){
    this.apiService.postData('matchbracket/nextphase', this.formGroup.value)
    .subscribe( (res:any) => {
         
    });

    this.dialogRef.close({
      event: "success"
    })

  }

  getTypeVictory(){
    this.apiService.getData("typevictory")
    .subscribe({
      next: (res:any) => {
        this.typesvictory = res
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }


  setWinner(athlete_winner:any, athlete_name:any){
    
    if(athlete_winner){
      console.log('estamos')
      this.athlete_name = athlete_name;
      // this.athlete_winner = athlete_id_winner;
      // this.formGroup.setValue({ athlete_id_winner: athlete_winner })
    } else {
      console.log('ep')
      this.athlete_name = "BYE";
      this.athlete_id_winner = null;
    }
    console.log(this.formGroup)
  }
}
