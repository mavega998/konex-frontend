import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  module: string = 'medicine';

  constructor(private httpClient: HttpClient) { }

  listAll(page = 0, size = 10) {
    return this.httpClient.get(`${environment.apiUrl}/${this.module}/list?page=${page}&size=${size}`)
  }

  save(medicine: any) {
    return this.httpClient.post(`${environment.apiUrl}/${this.module}/create`, medicine);
  }

  update(medicine: any) {
    return this.httpClient.put(`${environment.apiUrl}/${this.module}/update`, medicine);
  }

  delete(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/${this.module}/${id}`)
  }
}
