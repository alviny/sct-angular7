import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Item } from '../model/item'
@Component({
  selector: 'edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  public active = false;
  public link :string = '';
  public editForm: FormGroup = new FormGroup({
    'itemNumber': new FormControl(),
    'summary': new FormControl('', Validators.required),
    'description': new FormControl('', Validators.required),
    'price' : new FormControl('',Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,10}\.[0-9][0-9]')]))
    //'UnitsInStock': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
});
  constructor() { }

  ngOnInit() {
  }
  @Input() public isNew = false;
  @Input() public set model(item : Item){

    this.editForm.reset(item);
 

    this.active = item !== undefined;
    if (item !== undefined){
      this.link = item['_links']['self']['href'];
      console.log("set model : " + JSON.stringify(item));
      console.log("link:" + this.link);
    }

  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<Item> = new EventEmitter();

  public onSave(e):void{
    e.preventDefault();
    this.save.emit(this.editForm.value);
    this.active = false;
  }
  public onCancel(e): void{
    e.preventDefault();
    this.closeForm();
  }
  public closeForm(): void{
    this.active = false;
    this.cancel.emit();
  }
}