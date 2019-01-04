import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { toODataString } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { strictEqual } from 'assert';
import { stringify } from 'querystring';

export abstract class GenericService extends BehaviorSubject<GridDataResult> {
    public loading: boolean;

    constructor(private http: HttpClient,
                protected baseUrl: string,
                protected resourceName:string) {
        super(null);
    }

    public query(state: any): void {
        this.fetch(this.resourceName, state)
            .subscribe(x => super.next(x));
    }

    protected fetch(resourceName: string, state: any): Observable<GridDataResult> {
        const queryStr = `${this.toParam(state)}`;
        this.loading = true;

        return this.http
            .get(`${this.baseUrl}/${resourceName}?${queryStr}`)
            .pipe(
                map(response => (<GridDataResult>{
                    data: response['_embedded'][`${this.resourceName}`],
                    total: parseInt(response['page']['totalElements'], 10)
                })),
                tap(() => this.loading = false)
            );
    }
    /**
     * skip = page
     * size = take
     */
    protected toParam(state:any):string{
        const queryParams = `page=${state['skip']}&size=${state['take']}`
        return queryParams;
    }
}