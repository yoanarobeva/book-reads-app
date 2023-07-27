import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BooksService {
  
  constructor(private http: HttpClient) { }

  getAllLists () {
    return this.http.get('/api/data/lists');
  }

  getAList (listId: string) {
    return this.http.get(`/api/data/lists/${listId}`);
  }

  getBooksFromList (listId: string) {
    return this.http.get(`/api/data/books?where=_listId%3D%22${listId}%22`)
  }
  
  getAllBooks () {
    return this.http.get(`/api/data/books`);
  }

  getABook (bookId: string) {
    return this.http.get(`/api/data/books/${bookId}`);
  }

  addABook(bookData: any) {
    return this.http.post('/api/data/books', bookData);
  }

  updateABook(bookId: string, bookData: any) {
    return this.http.put(`/api/data/books/${bookId}`, bookData);
  }

  removeABook(bookId: string) {
    return this.http.delete(`/api/data/books/${bookId}`);
  }
}
