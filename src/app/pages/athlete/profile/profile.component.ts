import { Component } from '@angular/core';
import { MaterialModule } from '../component/material.module';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MaterialModule,
    
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
