import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {

  sales: any[] = [];
  columnNames: any[] = []

  sale!: FormGroup;

  constructor(private saleService: SaleService,private fb: FormBuilder) {
    this.sale = this.fb.group({
      createDate: [null, Validators.required],
      idMedicine: [null, Validators.required],
      nameMedicine: [null, Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      pricePerUnit: [0, [Validators.required, Validators.min(1)]],
      priceTotal: [0, [Validators.required, Validators.min(1)]]
    })
  }

  ngOnInit(): void {
    this.columnNames = [
      { name: 'Id', prop: 'id' },
      { name: 'Fecha de Creación', prop: 'createDate' },
      { name: 'Medicamento', prop: 'nameMedicine' },
      { name: 'Cantidad', prop: 'quantity' },
      { name: 'Precio Unitario', prop: 'pricePerUnit' },
      { name: 'Precio Total', prop: 'priceTotal' },
    ];
    this.loadData();
  }

  loadData() {
    this.sales = [];
    this.saleService.listAll().subscribe((data: any) => {
      this.sales = data.content;
    });
  }
}
