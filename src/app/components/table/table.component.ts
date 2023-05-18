import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  private _items = [];

  @Input() title = '';
  @Input() columnNames: any[] = [];
  @Input() showBtnNew = true;
  @Input() showBtnEdit = true;
  @Input() showBtnBuy = true;
  @Input() set items(value: any) {
    this._items = value;
  }
  get items() {
    return this._items;
  }

  @Output() handleBtnReload = new EventEmitter();
  @Output() handleBtnNew = new EventEmitter();
  @Output() handleBtnEdit = new EventEmitter();
  @Output() handleBtnBuy = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  reloadData() {
    this.handleBtnReload.emit(true);
  }

  newItem() {
    this.handleBtnNew.emit(true);
  }

}
