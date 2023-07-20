import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_key, url } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})

export class BooksService {
  
  constructor(private http: HttpClient) { }
  
  getAllBooks () {
    return this.http.get(`${url}/lists/overview.json?api-key=${api_key}`)
  }
}
