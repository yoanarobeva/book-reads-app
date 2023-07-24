import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})

export class BooksService {
  
  constructor(private http: HttpClient) { }
  
  getAllBooks () {
    return this.http.get(`${url}/data/lists`)
  }

  getABook (listName: string, bookId: string) {
    return this.http.get(`${url}/data/lists?where=list_name=${listName}`)
  }
}
