import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../component/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';

@Component({
  selector: 'app-event-matchbracket-detail',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './event-matchbracket-detail.component.html',
  styleUrl: './event-matchbracket-detail.component.scss'
})
export class EventMatchbracketDetailComponent {
  
  matchbracket:any = {}

  constructor(
    public dialogRef: MatDialogRef<EventMatchbracketDetailComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
    this.matchbracket = this.data.matchbrackets
    console.log(this.data.matchbrackets)
  }

  socialcards: any[] = [
    {
      id: 1,
      imgSrc: '/assets/images/profile/user-1.jpg',
      username: 'Andrew Grant',
      post: 'Technology Director',
    },
    {
      id: 2,
      imgSrc: '/assets/images/profile/user-2.jpg',
      username: 'Andrew Grant',
      post: 'Technology Director',
    },
  ];

  getAge(birthdate: any) : any {
    return moment().diff(birthdate, 'years')
  }
}
