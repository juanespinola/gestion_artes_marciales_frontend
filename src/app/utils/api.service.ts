import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
  
})
export class ApiService {
  constructor(private http: HttpClient) { }
  urlApi = 'http://localhost:8000/api/';

  getData(collection:string) {
    let url = this.urlApi+collection;
    return this.http.get(url);
  }

  postData(collection:string, data: any, options: any = {}) {
    let url = this.urlApi+collection;
    return this.http.post(url, data, options);
  }

  putData(collection: string, id:any, data:any) {
    let url = this.urlApi+collection;
    return this.http.put(`${url}/${id}`, data)
  }

  deleteData(collection:any, id:any) {
    let url = this.urlApi+collection;
    return this.http.delete(`${url}/${id}`);
  }
}
