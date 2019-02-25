import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { toODataString } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { strictEqual } from 'assert';
import { stringify } from 'querystring';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
};

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
        let queryParams = '';
        if( state !== undefined){
          let page = Math.floor(state.skip / state.take )
           console.log("skip=" + state.skip + ", take=" + state.take + ", page=" + page);
           queryParams = `page=${page}&size=${state['take']}`;
        }
        
        return queryParams;
    }
    public remove(data: any) {
        //this.reset();
        this.deleteItem(data);
        //this.fetch().subscribe(() => this.read(), () => this.read());
    }   
    public deleteItem(item:any){
        let bodyString = JSON.stringify(item);
        let url = `${this.baseUrl}/${this.resourceName}/${item.id}`;    
        console.log("deleting " + url);
        this.http.delete(url,httpOptions).subscribe(() => console.log('deleted successfully'),
                                                    () => console.log('Unable to delete item'));    
    } 
    public save(data: any, isNew? : boolean) : Observable<any>{
 
        if( isNew ){
            return this.addItem(data);
        }else{
            return this.updateItem(data);
        }
    }
    public addItem(item:any) : Observable<any>{
        let bodyString = JSON.stringify(item);
        console.log("string:" + bodyString);
        let url = `${this.baseUrl}/${this.resourceName}`;    
        console.log("adding" + url);
        return this.http.post(url, bodyString,httpOptions ); 
    }
    public updateItem(item:any) : Observable<any> {
        let bodyString = JSON.stringify(item);
        console.log("string:" + bodyString);
        let url = `${this.baseUrl}/${this.resourceName}/${item.itemNumber}`;
        console.log("updating " + url);
        return this.http.put(url,bodyString,httpOptions );
                 
    }
}