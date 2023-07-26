import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BooksService {
  
  constructor(private http: HttpClient) { }
  
  getAllBooks () {
    return this.http.get(`/api/data/lists`)
  }

  getABook (listName: string, bookId: string) {
    return this.http.get(`/api/data/lists?where=list_name=${listName}`)
  }
}
