import { Component, OnInit, Inject } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { CategoriesService } from '../service/northwind.service';
import { Observable } from 'rxjs/Observable';
import { Item } from '../model/item';
import {
  GridDataResult,
  DataStateChangeEvent
} from '@progress/kendo-angular-grid';
import { ItemService } from '../service/item.service';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
/**
 * skip = page
 * size = take
 */
export class ItemsComponent implements OnInit {
  ngOnInit() {
  }
  public view: Observable<GridDataResult>;
  public state: State = {
      skip: 0,
      take: 5
  };
  public editDataItem: Item;
  public isNew: boolean;
  constructor(@Inject('ItemService')private service: ItemService) {
      this.view = service;
      this.service.query(this.state);
  }

  public dataStateChange(state: DataStateChangeEvent): void {
      this.state = state;
      this.service.query(state);
  }
  public addItemHandler() {
    this.editDataItem = new Item();
    this.isNew = true;
  }

  public editItemHandler({dataItem}) {
    this.editDataItem = dataItem;
    this.isNew = false;
  }

  public cancelItemHandler() {
    this.editDataItem = undefined;
  }

  public saveItemHandler(item: Item) {
    this.service.save(item, this.isNew);

    this.editDataItem = undefined;
    this.service.query(this.state);
  }

  public removeItemHandler({dataItem}) {
    this.service.remove(dataItem);
  }   
}
