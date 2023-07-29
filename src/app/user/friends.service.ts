import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('/api/data/users');
  }

  addFriend(friendId: string) {
    return this.http.post(`/api/data/friends`, JSON.stringify({friendId}));
  }

  getFriends(userId: string) {
    return this.http.get(`/api/data/friends?where=_ownerId%3D%22${userId}%22`);
  }

  removeFriend(friendshipId: string) {
    return this.http.delete(`/api/data/friends/${friendshipId}`);
  }
}
