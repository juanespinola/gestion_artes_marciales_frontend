import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  constructor(private toastr: ToastrService) { }

  showAlert(title: string, body: string, type: string) {
    switch (type) {
      case 'success':
        this.toastr.success(body, title );
        break;
      case 'error':
        this.toastr.error(body, title);
        break;
      case 'warning':
        this.toastr.warning(body, title);
        break;
      case 'info':
        this.toastr.info(body, title);
        break;

      default:
        this.toastr.error( "No se puede definir que sucede!", "Upps!");
        break;
    }
  }
}

