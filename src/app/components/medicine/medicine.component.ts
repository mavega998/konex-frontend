import { Component, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/services/medicine.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaleService } from 'src/app/services/sale.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss']
})
export class MedicineComponent implements OnInit {

  medicines: any[] = [];
  columnNames: any[] = []

  showModal = false;
  showModalBuy = false;
  showConfirmModal = false;

  medicine!: FormGroup;
  sale!: FormGroup;
  medicineSelected: any = null;

  constructor(
    private medicineService: MedicineService,
    private saleService: SaleService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.medicine = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      lab: [null, Validators.required],
      createDate: [null, Validators.required],
      dueDate: [null, Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });

    this.sale = this.fb.group({
      quantity: [0, [Validators.required, Validators.min(1)]]
    })
  }

  ngOnInit(): void {
    this.columnNames = [
      { name: 'Id', prop: 'id' },
      { name: 'Nombre', prop: 'name' },
      { name: 'Laboratorio', prop: 'lab' },
      { name: 'Fecha de Creación', prop: 'createDate' },
      { name: 'Fecha de Vencimiento', prop: 'dueDate' },
      { name: 'Cantidad', prop: 'stock' },
      { name: 'Precio', prop: 'price' },
      { name: 'Acciones', prop: 'actions' }
    ]
    this.loadData();
  }

  loadData() {
    this.medicines = [];
    this.medicineService.listAll().subscribe((data: any) => {
      this.medicines = data.content;
    });
  }

  saveMedicine() {
    if (this.medicine.valid) {
      if (this.medicine.get('id')?.value) {
        this.medicineService.update(this.medicine.value).subscribe(data => {
          this.resetForm();
          this.loadData();
          this.showModal = false;
        });
      } else {
        this.medicineService.save(this.medicine.value).subscribe(data => {
          this.resetForm();
          this.loadData();
          this.showModal = false;
        });
      }
    }
  }

  newMedicine() {
    this.resetForm();
    this.showModal = true;
  }

  sellMedicine(medicine: any) {
    this.medicineSelected = medicine;
    this.showModalBuy = true;
  }

  editMedicine(medicine: any) {
    this.medicine.setValue(medicine);
    this.showModal = true;
  }

  buyItem() {
    const item = {
      createDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm'),
      idMedicine: this.medicineSelected.id,
      nameMedicine: this.medicineSelected.name,
      ...this.sale.value,
      pricePerUnit: this.medicineSelected.price,
      priceTotal: 0
    };

    item.priceTotal = item.quantity * item.pricePerUnit;
    this.saleService.save(item).subscribe(data => {
      console.log(data);
      this.showModalBuy = false;
      this.medicineSelected = null;
      this.loadData();
    })
  }

  resetForm() {
    this.medicine.reset();
    this.medicine.get('stock')?.setValue(0);
    this.medicine.get('price')?.setValue(0);
  }

  confirmModal(medicine: any) {
    this.showConfirmModal = true;
    this.medicineSelected = medicine;
  }

  deleteMedicine() {
    this.medicineService.delete(this.medicineSelected.id).subscribe(data => {
      console.log(data);
      this.showConfirmModal = false;
      this.loadData();
    })
  }
}
