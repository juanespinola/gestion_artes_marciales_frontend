import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
  
})
export class ApiService {
  constructor(private http: HttpClient) { }
  urlApi = 'http://localhost:8001/api/';

  getData(collection:string) {
    let url = this.urlApi+collection;
    return this.http.get(url);
  }

  postData(collection:string, data: any) {
    let url = this.urlApi+collection;
    return this.http.post(url, data);
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
