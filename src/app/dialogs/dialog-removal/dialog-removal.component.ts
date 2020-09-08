/* tslint:disable */
import { Component, OnInit, Inject } from '@angular/core';
import { BooksOperationsService } from 'src/app/services/books-operations.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBook } from 'src/app/interfaces/book';

@Component({
  selector: 'app-dialog-removal',
  templateUrl: './dialog-removal.component.html',
  styleUrls: ['./dialog-removal.component.scss']
})
export class DialogRemovalComponent implements OnInit {

  constructor(private booksOperationsService: BooksOperationsService, public dialogRef: MatDialogRef<DialogRemovalComponent>, @Inject(MAT_DIALOG_DATA) public data: IBook) { }//to samo co w klasie DialogAddingABookComponent

  ngOnInit(): void {
  }

  delete(): void {//w klasie HomeComponent w metodzie delete_book wyjaśniłem już czemu wysyłam w tej metodzie cały obiekt
    this.dialogRef.close({ event: 'delete', data: this.data });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'close' });
  }

}
