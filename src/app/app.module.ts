import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesService } from './service/northwind.service';
import { GenericService } from './service/generic.service';
import { Item } from './model/item';
import { ItemService } from './service/item.service';
@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GridModule,
    HttpClientModule
  ],
  providers: [CategoriesService,
              {
                deps: [HttpClient],
                provide: 'ItemService',
                useFactory: (jsonp:HttpClient) => (new ItemService(jsonp,'/api','items'))
              }
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
