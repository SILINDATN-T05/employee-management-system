import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor(private http: HttpClient) { }

  get(uri: string , id: any = '') {
    return this.http.get(environment.baseUrl + uri + `/${id}`);
  }
  post(uri: string, data: any) {
    return this.http.post(environment.baseUrl + uri, data);
  }
  put(uri: string , id: any, data: any) {
    return this.http.put(environment.baseUrl + uri + `/${id}`, data);
  }
  delete(uri: string , id: any) {
    return this.http.delete(environment.baseUrl + uri + `/${id}`);
  }
}
