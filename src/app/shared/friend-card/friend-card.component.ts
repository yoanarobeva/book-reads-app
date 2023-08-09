import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Friend, User } from '../types';
import { FriendsService } from 'src/app/user/services/friends.service';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.css']
})
export class FriendCardComponent {

  @Input() isFriend!: boolean;
  @Input() user!: Friend | User;

  @Output() newfriendEvent = new EventEmitter<string>();

  constructor(private friendsService: FriendsService) {}

  addFriendHandler(friendId: string) {
    this.friendsService.addFriend(friendId).subscribe({
      next: (data) => {
        this.newfriendEvent.emit(friendId);
      },
      error: err => console.error(err.message)
    })
  }

  unfriendHandler(friendshipId: string) {
    this.friendsService.removeFriend(friendshipId).subscribe({
      next: () => {
        this.newfriendEvent.emit(this.user._id);
      },
      error: err => console.error(err.message)
    })
  }
}
