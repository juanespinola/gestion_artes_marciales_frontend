import { Component } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { AppSettings } from '../../app.config';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../components/material.module';
import { HeaderComponent } from './components/header/header.component';
import { ApiService } from '../../utils/api.service';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [
    RouterOutlet,  
    MaterialModule,
    HeaderComponent,
  ],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss'
})
export class OrganizationComponent {
  private htmlElement!: HTMLHtmlElement;

  options = this.settings.getOptions();

  constructor (
    private settings: CoreService, 
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService, 
    private router: Router
  ) {
    this.htmlElement = document.querySelector('html')!;
     // Initialize project theme with options
     this.receiveOptions(this.options);
  }

  receiveOptions(options: AppSettings): void {
    this.options = options;
    this.toggleDarkTheme(options);
  }

  toggleDarkTheme(options: AppSettings) {
    if (options.theme === 'dark') {
      this.htmlElement.classList.add('dark-theme');
      this.htmlElement.classList.remove('light-theme');
    } else {
      this.htmlElement.classList.remove('dark-theme');
      this.htmlElement.classList.add('light-theme');
    }
  }

  federations: any;

  ngOnInit() {
    this.getFederations()
  }

  getFederations(){
    this.apiService.getData('federations')
    .subscribe({
      next: (res:any) => {
        // console.log(res)
        this.federations = res
      },
      error: (err) => console.log(err),
      complete: () => {}
    });

  }

  selectedFederation(federation_id: number) {
    // this.router.navigate(['/events', federation_id]);
    this.router.navigate(['federations', federation_id]);
  }
  
}
