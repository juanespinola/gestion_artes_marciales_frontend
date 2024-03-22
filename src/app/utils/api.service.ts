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

  postData(): void {
    const data = { name: 'John', age: 30 };
    this.http.post('https://api.example.com/data', data).subscribe(
      response => console.log('POST Response:', response),
      error => console.error('POST Error:', error)
    );
  }

  putData(): void {
    const id = 123;
    const updatedData = { name: 'Updated John', age: 35 };
    this.http.put(`https://api.example.com/data/${id}`, updatedData).subscribe(
      response => console.log('PUT Response:', response),
      error => console.error('PUT Error:', error)
    );
  }

  deleteData(): void {
    const id = 123;
    this.http.delete(`https://api.example.com/data/${id}`).subscribe(
      response => console.log('DELETE Response:', response),
      error => console.error('DELETE Error:', error)
    );
  }
}
