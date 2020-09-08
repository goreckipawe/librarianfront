/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBook } from '../interfaces/book';
import { ICategory } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class BooksOperationsService {//tutaj nie trzeba chyba nic dodawać proste posty i gety w serwisie można to oczywiście zrobić lepiej, ale z uwagi na wielkość projektu zdecydowałem się na to rozwiązanie ponieważ nie wpływa to zbytnio na wydajność projektu i jest szybsze w implementacji
  private BACKEND: string = "http://127.0.0.1:8000";//choć główną ścieżkę do backendu można by przenieść do plików environments dzięki czemu ścieżka na produkcję mogła by być inna niż ta lokalnie i nie trzeba byłoby jej zmieniać
  private DOWNLOAD_BOOKS: string = `${this.BACKEND}/download_books`;
  private DOWNLOAD_CATEGORIES: string = `${this.BACKEND}/download_categories`;
  private UPDATE_BOOK: string = `${this.BACKEND}/update_book`;
  private INSERT_BOOK: string = `${this.BACKEND}/insert_book`;
  private DELETE_BOOK: string = `${this.BACKEND}/delete_book`;

  constructor(private http: HttpClient) { }

  downloadBooks(): Observable<IBook[]>{
    return this.http.get<IBook[]>(this.DOWNLOAD_BOOKS);
  }

  downloadCategories(): Observable<ICategory[]>{
    return this.http.get<ICategory[]>(this.DOWNLOAD_CATEGORIES);
  }

  updateBook(book: IBook): Observable<IBook> {
    return this.http.post<IBook>(this.UPDATE_BOOK, book);
  }

  insertBook(book: IBook): Observable<IBook> {
    return this.http.post<IBook>(this.INSERT_BOOK, book);
  }

  deleteBook(book: IBook): Observable<IBook> {
    return this.http.post<IBook>(this.DELETE_BOOK, book);
  }
}
