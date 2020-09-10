/* tslint:disable */ //musiałem wyłączyć tslint strasznie mnie denerwuje 
import { Component, OnInit } from '@angular/core';
import { BooksOperationsService } from '../services/books-operations.service';
import { IBook } from '../interfaces/book';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditingABookComponent } from '../dialogs/dialog-editing-a-book/dialog-editing-a-book.component';
import { ICategory } from '../interfaces/category';
import { DialogRemovalComponent } from '../dialogs/dialog-removal/dialog-removal.component';
import { DialogAddingABookComponent } from '../dialogs/dialog-adding-a-book/dialog-adding-a-book.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books: IBook[];
  categories: ICategory[];
  displayedColumns = ['title', 'description', 'date_of_creation', 'year_of_publishment', 'edition', 'delete'];//aby wyświetlić tabelę użyłem tabeli z angular material ponieważ jest to proste i szybkie rozwiązanie jak na taki projekt

  constructor(private booksOperationsService: BooksOperationsService, public dialog: MatDialog) { }

  ngOnInit(): void {//pobieram w tym miejscu dane z bazy danych być może nie jet to eleganckie rozwiązanie, ale do projektu tej wielkości raczej wystarcza 
    this.booksOperationsService.downloadBooks().subscribe(data => {
      this.books = data;
    },
    error => {
      console.error(error);
    });

    this.booksOperationsService.downloadCategories().subscribe(data => {
      this.categories = data;
    },
    error => {
      console.error(error);
    });
  }

  edit_book(element){//do edycji, dodawania oraz usuwania pozycji z tabeli wykorzystuje dialogi uznałem że pasują w sam raz do tego projektu
    const dialogRef = this.dialog.open(DialogEditingABookComponent, {
      width: '700px',
      height: '600px',
      disableClose: true,
      data: {element: element, categories: this.categories}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result["event"] == "save") {
        this.booksOperationsService.updateBook(result["data"]["element"]).subscribe(data => {//po zaktualizowaniu danych wysyłam obiekt do backendu jest to moim zdaniem najlepsze rozwiązanie ponieważ mamy wtedy dostęp do wszystkich atrybótów/właściwości obiektu  
          console.log("success");
        },
        error => {
          console.error(error);
        });
      } else if(result["event"] == "close"){
        console.log("close");
      }
    });
  }

  adding_book() {
    const dialogRef = this.dialog.open(DialogAddingABookComponent, {
      width: '700px',
      height: '600px',
      disableClose: true,
      data: {categories: this.categories}
    });

    dialogRef.afterClosed().subscribe(result => {
      switch(String(result["event"])) {//użyłem tu switcha bo czemu nie if mi się znudził należy jednak zaznaczyć że switch nie powinien byc używany w językach takich jak TypeScript czy JavaScript bo nie są to języki silnie typowane ale to temat na dłuszą pogawędkę :)
        case "save": { 
          this.books = [...this.books, result["data"]];//dodaje nową pozycję do tabeli 
          this.booksOperationsService.insertBook(result["data"]).subscribe(data => {
            console.log("success");
          },
          error => {
            console.error(error);
          });
           break; 
        } 
        case "close": { 
           console.log("close"); 
           break; 
        } 
     }
    });
  }

  delete_book(element){
    const dialogRef = this.dialog.open(DialogRemovalComponent, {
      width: '300px',
      height: '150px',
      disableClose: true,
      data: {element: element}
    });

    //usuwam obiekt i tak wiem że teoretycznie mogę przesłać tu samo id jednak przekonałem się o tym że często przy usuwaniu rekordu z tabeli 
    //może zaistnieć potrzeba że przed jego usunięciem chcemy do czegoś wykorzystać jego dane dlatego przesłany obiekt wydaje się dla mnie lepszym rozwiązaniem, a samo id mogę zawsze wydobyć z niego bez problemu :)
    dialogRef.afterClosed().subscribe(result => {
      if(result["event"] == "delete") {
        let index: number = this.books.indexOf(element);
        this.books = [...this.books.slice(0, index), ...this.books.slice(index + 1)];//usuwam element z listy
        this.booksOperationsService.deleteBook(result["data"]).subscribe(data => {
          console.log("success");
        },
        error => {
          console.error(error);
        });
      } else if(result["event"] == "close"){
        console.log("close");
      }
    });
  }
}
