import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../routes';
import { ApiService } from '../utils/api.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private router: Router,
    private apiService: ApiService) {
  }
  // Set a value in local storage
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // Get a value from local storage
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Remove a value from local storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  clear(): void {
    localStorage.clear();
  }

  isAuthenticated() {
    if (!localStorage.getItem('user')) {
      this.logout()
    }
    return false;
  }

  getUser(): any | null {
    return JSON.parse(localStorage.getItem('user')!);
  }

  logout(){
    this.apiService.getData('logout')
    .subscribe( (res:any) => {
        console.log(res)
    });
    localStorage.clear()
    this.router.navigate([APP_ROUTES.ADMIN_SIGNIN])
  }

  logoutAthlete(){
    this.apiService.getData('athlete/logout')
    .subscribe( (res:any) => {
        console.log(res)
    });
    localStorage.clear()
    this.router.navigate([APP_ROUTES.ATHLETE_SIGNIN])
  }
}
