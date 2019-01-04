import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs/Observable';
import { Item } from '../model/item';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ItemService extends GenericService {
   
    queryAll(st?: any): Observable<GridDataResult> {
        const state = Object.assign({}, st);
        delete state.skip;
        delete state.take;
        return this.fetch(this.resourceName, state);
    }
}