import { Injectable } from '@angular/core';
import { ApiService } from '../utils/api.service';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(
    private apiService: ApiService
  ) { }



  insertRequest(obj: any){
    const {requested_by , date_request, request_type_id, request_text,  } = obj
    this.apiService.postData('requestautorization', {
      'requested_by' : requested_by,
      'date_request': date_request,
      'request_type_id' : request_type_id,
      'request_text': request_text,
      'status' : 'pendiente',
    })
    .subscribe( (res:any) => {
        console.log(res)
    });
  }


  updateRequest(){

  }


  deleteRequest(){

  }
}
