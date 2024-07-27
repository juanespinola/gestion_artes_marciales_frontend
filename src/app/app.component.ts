import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { ComponentsModule } from './pages/admin/components/components.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './pages/admin/components/material.module';
import { NavigationService } from './services/navigation.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MaterialModule,
    RouterOutlet,  
    ComponentsModule,
    TranslateModule
  ],
  providers:[
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  
})
export class AppComponent {
  title = 'gestion_artes_marciales_frontend';

  constructor(public navigationService: NavigationService){
    this.navigationService.startSaveHistory()
  }

}
