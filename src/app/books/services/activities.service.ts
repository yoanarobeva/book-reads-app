import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private http: HttpClient) { }

  registerActivity(activity: string, listId: string, bookId: string) {
    return this.http.post(`/api/data/activities/`, {activity, listId, bookId});
  }

  getUserActivities(userId: string) {
    return this.http.get(`/api/data/activities?where=_ownerId%3D%22${userId}%22&load=book%3DbookId%3Abooks`);
  }
}
