import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BooksService {
  
  constructor(private http: HttpClient) { }
  
  getAllBooks () {
    const url = 'https://api.nytimes.com/svc/books/v3';
    const api_key = 'iA5hAKH6YltneW9kYIRGNJSZiek71VpP';

    return this.http.get(`${url}/lists/overview.json?api-key=${api_key}`)
  }
}
