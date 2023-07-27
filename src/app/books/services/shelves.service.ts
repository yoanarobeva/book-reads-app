import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BooksService } from './books.service';

@Injectable({
  providedIn: 'root'
})
export class ShelvesService {

  constructor(private http: HttpClient, private booksService: BooksService) { }

  getOwnShelves(userId: string) {
    return this.http.get(`/api/data/shelves?where=_ownerId%3D%22${userId}%22&load=bookData%3DbookId%3Abooks`);
  }

  // getOwnShelf(userId: string, shelfName: string) {
  //   const match = encodeURIComponent(`shelf="${shelfName}",_ownerId="${userId}"`);
  //   debugger;
  //   return this.http.get(`/api/data/shelves?where=${match}`);
  // }

  getShelf(shelfName: string) {
    return this.http.get(`/api/data/shelves?where=shelf%3D%22${shelfName}%22`);
  }

  addBook(shelf: string, listId: string, bookId: string) {
    return this.http.post(`/api/data/shelves`, {shelf, listId, bookId});
  }

  removeBook(shelfId: string,) {
    return this.http.delete(`/api/data/shelves/${shelfId}`);
  }
}
