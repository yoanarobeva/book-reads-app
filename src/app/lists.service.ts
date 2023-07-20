import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_key, url } from './shared/constants';

@Injectable({
  providedIn: 'root'
})

export class ListsService {

  constructor(private http: HttpClient) { }

  getAllLists () {
    return this.http.get(`${url}/lists/names.json?api-key=${api_key}`);
  }
}
