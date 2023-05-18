import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  module: string = 'sale';

  constructor(private httpClient: HttpClient) { }

  listAll(page = 0, size = 10) {
    return this.httpClient.get(`${environment.apiUrl}/${this.module}/list?page=${page}&size=${size}`)
  }

  save(sale: any) {
    return this.httpClient.post(`${environment.apiUrl}/${this.module}/create`, sale);
  }

  update(sale: any) {
    return this.httpClient.put(`${environment.apiUrl}/${this.module}/update`, sale);
  }

  delete(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/${this.module}/${id}`)
  }
}
