import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { SignInComponent } from '../../pages/sign-in/sign-in.component';
import { SignUpComponent } from '../../pages/sign-up/sign-up.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatTabsModule,
    SignInComponent,
    SignUpComponent
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
