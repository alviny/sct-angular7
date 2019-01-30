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
import { EditItemComponent } from './edit-item/edit-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule, AutoCompleteModule } from '@progress/kendo-angular-dropdowns';


 
@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    EditItemComponent
  ],
  imports: [
    HttpClientModule,    
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    GridModule,
    DialogModule,
    LayoutModule, 
    InputsModule,
    DropDownsModule
    
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
