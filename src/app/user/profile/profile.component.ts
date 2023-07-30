import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ShelvesService } from 'src/app/books/services/shelves.service';
import { Shelf, User } from 'src/app/shared/types';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
    userShelves: Shelf[] | undefined;
    wantShelf: Shelf[] = [];
    currentShelf: Shelf[] = [];
    readShelf: Shelf[] = [];
    isLoading: boolean = true;
    friends: User[] | undefined;
    subOne!: Subscription;
    subTwo!: Subscription;

    user!: User;

    constructor(private shelvesService: ShelvesService, private authService: AuthService, private friendsService: FriendsService) {};

    unfriend(friendId: string) {
        this.friends = this.friends?.filter((x:User) => x._id !== friendId);
    }

    ngOnInit(): void {
        this.user = this.authService.user!;
        
        this.subOne = this.shelvesService.getOwnShelves(this.user._id).subscribe({
            next: (data: any) => {
                this.userShelves = data;
                if(this.userShelves) {
                    this.wantShelf = this.userShelves.filter((x:any) => x.shelf === 'want');
                    this.currentShelf = this.userShelves.filter((x:any) => x.shelf === 'currently');
                    this.readShelf = this.userShelves.filter((x:any) => x.shelf === 'read');
                    this.isLoading = false;
                }
            },
            error: err => console.error(err.message)
        });

        this.subTwo = this.friendsService.getFriends(this.user._id).subscribe({
            next: (friends: any) => {
                this.friends = friends;
                this.friends = this.friends?.map((x: any) => ({...x.friendData, "friendshipId" : x._id}))
            },
            error: err => console.error(err.message)
        })
    }

    ngOnDestroy(): void {
        this.subOne.unsubscribe();
        this.subTwo.unsubscribe();
    }
}
