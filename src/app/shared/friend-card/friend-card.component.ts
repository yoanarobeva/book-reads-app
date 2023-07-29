import { Component, Input } from '@angular/core';
import { User } from '../types';
import { FriendsService } from 'src/app/user/friends.service';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.css']
})
export class FriendCardComponent {
  @Input() isFriend!: boolean;
  @Input() user!: User;

  constructor(private friendsService: FriendsService) {}

  addFriendHandler(friendId: string) {
    this.friendsService.addFriend(friendId).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: err => console.error(err.message)
    })
  }

  unfriendHandler(friendId: string) {
    
  }
}
