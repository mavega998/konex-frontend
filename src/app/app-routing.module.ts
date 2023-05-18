import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicineComponent } from './components/medicine/medicine.component';
import { SaleComponent } from './components/sale/sale.component';

const routes: Routes = [
  {
    path: 'medicamentos',
    component: MedicineComponent
  },
  {
    path: 'ventas',
    component: SaleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
