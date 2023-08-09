import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shelf } from 'src/app/shared/types';

@Injectable({
  providedIn: 'root'
})
export class ShelvesService {

  constructor(private http: HttpClient) {}

  getOwnShelves(userId: string) {
    return this.http.get<Shelf[]>(`/api/data/shelves?where=_ownerId%3D%22${userId}%22&load=bookData%3DbookId%3Abooks`);
  }

  // getOwnShelf(userId: string, shelfName: string) {
  //   const match = encodeURIComponent(`shelf="${shelfName}",_ownerId="${userId}"`);
  //   return this.http.get(`/api/data/shelves?where=${match}`);
  // }

  getShelf(shelfName: string) {
    return this.http.get<Shelf>(`/api/data/shelves?where=shelf%3D%22${shelfName}%22`);
  }

  addBook(shelf: string, listId: string, bookId: string) {
    return this.http.post<Shelf>(`/api/data/shelves`, {shelf, listId, bookId});
  }

  removeBook(shelfId: string,) {
    return this.http.delete(`/api/data/shelves/${shelfId}`);
  }
}
