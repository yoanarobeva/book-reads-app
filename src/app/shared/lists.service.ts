import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from './constants';

@Injectable({
  providedIn: 'root'
})

export class ListsService {

  constructor(private http: HttpClient) { }

  getAllLists () {
    return this.http.get(`${url}/data/lists?select=list_id,list_name,display_name`);
  }
}
