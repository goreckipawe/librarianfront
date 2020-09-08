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

export const MY_FORMATS = {//ustawiam format daty w datepicker swoją drogą mogli by to uprościć
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
  selector: 'app-dialog-adding-a-book',
  templateUrl: './dialog-adding-a-book.component.html',
  styleUrls: ['./dialog-adding-a-book.component.scss'],
  providers: [//dalszy ciąg ustawiania formatu daty
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DialogAddingABookComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  title: string; 
  description: string;
  date_of_creation: number;
  date_of_creation_temp: string;
  categories: ICategory[];
  book: IBook;

  constructor(private booksOperationsService: BooksOperationsService, public dialogRef: MatDialogRef<DialogAddingABookComponent>, @Inject(MAT_DIALOG_DATA) public data: IBook) { }//zwykły konstruktor nic nadzwyczajnego 

  ngOnInit(): void {
    this.dropdownList = this.data["categories"];
    this.categories = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField:  'id_category',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    let element = this.dropdownList.find(x => x.id_category === item["id_category"]);//wybieram zaznaczony elment (kategorię) z tablicy i dodaje do tablicy tymczasowej
    this.categories.push(element);
  }

  onItemDeSelect(items: any) {
    this.categories = this.categories.filter(element => element.id_category != items["id_category"]);//usuwam zaznaczony element (kategorię)
  }

  dateChange(event){
    const m: Moment = event.value;
    if(m){//pobieram i formatuje daty z datepicker
      let date = new Date(m.toDate()).toISOString().slice(0,10);//bardzo lubię tak formatować datę :)
      this.date_of_creation = m.toDate().getFullYear();
      this.date_of_creation_temp = date.toString();
    }
  }

  saveChanges(): void {
    this.book = {
      title: this.title,
      description: this.description,
      year_of_publishment: this.date_of_creation,//tak biorę rok publikacji z daty stworzenia robię to ponieważ tak jest poprostu szybciej i prościej poza tym w tym projekcie nie ma to raczej większego znaczenia
      date_of_creation: this.date_of_creation_temp,
      id_book: null,
      created_at: null,
      updated_at: null,
      deleted_at: null,
      categories: this.categories
    };
    
    this.dialogRef.close({ event: 'save', data: this.book });
  }
  
  closeDialog(): void {
    this.dialogRef.close({ event: 'close' });
  }
}
