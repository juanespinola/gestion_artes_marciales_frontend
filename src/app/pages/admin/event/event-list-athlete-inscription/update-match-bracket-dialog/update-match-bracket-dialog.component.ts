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
    this.matchbracket = data.matchbracket
    this.getTypeVictory();
  }

  ngOnInit() {
    // en caso que el athlete_id_one or two sea null, que pase directamente
    this.formGroup = this.formBuilder.group({
      match_bracket_id: [this.matchbracket.id],
      score_one_athlete: [this.matchbracket.score_one_athlete, Validators.required],
      score_two_athlete: [this.matchbracket.score_two_athlete, Validators.required],
      quadrilateral: [this.matchbracket.quadrilateral, Validators.required],
      match_timer: [this.matchbracket.match_timer, Validators.required],
      victory_type_id: ['', Validators.required],
      athlete_id_winner: ['', Validators.required],
      athlete_id_loser: [(this.athlete_id_winner == this.matchbracket.athlete_one.id) ? this.matchbracket?.athlete_one?.id : this.matchbracket?.athlete_two?.id]
    });
  }

  onSubmit(){
    
    this.apiService.postData('matchbracket/nextphase', this.formGroup.value)
    .subscribe( (res:any) => {
        this.updateRanking(res.data)
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
      this.athlete_name = athlete_name;
    } else {
      this.athlete_name = "BYE";
      this.athlete_id_winner = null;
    }
  }

  updateRanking(obj:any){
    console.log(obj)
    if(obj.athlete_id_winner){
      console.log(obj.athlete_id_winner)
      this.apiService.postData("ranking", {
        athlete_id: obj.athlete_id_winner,
        event_id:  obj.event_id,
        entry_category_id:  obj.entry_category_id,
        type: "win"        
      })
      .subscribe({
        next: (res:any) => {
          console.log(res)
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    }

    if(obj.athlete_id_loser){
      console.log(obj.athlete_id_loser)
      this.apiService.postData("ranking", {
        athlete_id: obj.athlete_id_loser,
        event_id:  obj.event_id,
        entry_category_id:  obj.entry_category_id,
        type: "lose"
      })
      .subscribe({
        next: (res:any) => {
          console.log(res)
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    }
    
  }


}
