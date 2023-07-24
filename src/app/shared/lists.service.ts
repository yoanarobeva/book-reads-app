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

  getAList(listName: string) {
    return this.http.get(`${url}/data/lists?where=list_name%3D%22${listName}%22`);
    // return this.http.get(`${url}/data/lists?where=list_name%3D%22${listName}%22&select=books`);
  }
}
