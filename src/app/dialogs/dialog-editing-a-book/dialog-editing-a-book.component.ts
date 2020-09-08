/* tslint:disable */
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBook } from 'src/app/interfaces/book';
import { BooksOperationsService } from 'src/app/services/books-operations.service';
import { ICategory } from 'src/app/interfaces/category';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormControl } from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { Moment } from 'moment';

const moment = _moment;

export const MY_FORMATS = {//to samo co w klasie DialogAddingABookComponent
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-dialog-editing-a-book',
  templateUrl: './dialog-editing-a-book.component.html',
  styleUrls: ['./dialog-editing-a-book.component.scss'],
  providers: [//to samo co w klasie DialogAddingABookComponent
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DialogEditingABookComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  title: string; 
  description: string;
  date_of_creation: Date;
  date_of_creation_year: number;
  date_of_creation_temp: string;
  categories: ICategory[];
  book: IBook;

  constructor(private booksOperationsService: BooksOperationsService, public dialogRef: MatDialogRef<DialogEditingABookComponent>, @Inject(MAT_DIALOG_DATA) public data: IBook) { }//to samo co w klasie DialogAddingABookComponent

  ngOnInit(): void {
    this.title = this.data["element"]["title"];
    this.dropdownList = this.data["categories"];
    this.selectedItems = this.data["element"]["categories"];
    this.description = this.data["element"]["description"];
    this.dropdownSettings = {
      singleSelection: false,
      idField:  'id_category',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.date_of_creation = new Date(this.data["element"]["date_of_creation"]);
    this.categories = this.data["element"]["categories"];
  }

  onItemSelect(item: any) {
    let element = this.dropdownList.find(x => x.id_category === item["id_category"]);//to samo co w klasie DialogAddingABookComponent
    this.categories.push(element);
  }

  onItemDeSelect(items: any) {
    this.categories = this.data["element"]["categories"].filter(element => element.id_category != items["id_category"]);//to samo co w klasie DialogAddingABookComponent
  }

  dateChange(event){
    const m: Moment = event.value;
    if(m){//to samo co w klasie DialogAddingABookComponent
      let date = new Date(m.toDate()).toISOString().slice(0,10);
      this.date_of_creation_year = m.toDate().getFullYear();
      this.date_of_creation_temp = date.toString();
    }
  }

  saveChanges(): void {
    this.data["element"]["title"] = this.title;//aktualizuje własciwości obiektu wydało mi się to szybsze i raczej nie wpływające na tak mały projekt 
    this.data["element"]["description"] = this.description;

    if(this.date_of_creation_temp != undefined){
      this.data["element"]["date_of_creation"] = this.date_of_creation_temp;
    }
    if(this.date_of_creation_year != undefined){
      this.data["element"]["year_of_publishment"] = this.date_of_creation_year;
    }
    
    this.data["element"]["categories"] = this.categories;
    
    this.dialogRef.close({ event: 'save', data: this.data });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'close' });
  }
}
