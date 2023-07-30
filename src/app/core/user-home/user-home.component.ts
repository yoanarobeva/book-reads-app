import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivitiesService } from 'src/app/books/services/activities.service';
import { ShelvesService } from 'src/app/books/services/shelves.service';
import { Shelf, User } from 'src/app/shared/types';
import { FriendsService } from 'src/app/user/services/friends.service';

@Component({
    selector: 'app-user-home',
    templateUrl: './user-home.component.html',
    styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit, OnDestroy{
    userShelves: Shelf[] | undefined;
    wantShelf: Shelf[] | undefined;
    currentShelf: Shelf | undefined;
    readShelf: Shelf[] | undefined ;
    isLoading: boolean = true;
    users!: User[];
    friends: any;
    activities: any = [];

    subOne!: Subscription;
    subTwo!: Subscription;

    constructor(
        private shelvesService: ShelvesService,
        private authService: AuthService,
        private friendsService: FriendsService,
        private activitiesService: ActivitiesService,
    ) {}

    addFriend(friendId: string) {
        this.users = this.users.filter((x: User) => x._id !== friendId);
    }

    get isLoggedIn () {
        return this.authService.isLogged;
    }

    ngOnInit(): void {
        const userId = this.authService.user!._id;
        
        this.subOne = this.shelvesService.getOwnShelves(userId).subscribe({
            next: (data: any) => {
                this.userShelves = data;
                this.wantShelf = this.userShelves?.filter((x:any) => x.shelf === 'want');
                this.currentShelf = this.userShelves?.find((x:any) => x.shelf === 'currently');
                this.readShelf = this.userShelves?.filter((x:any) => x.shelf === 'read');
                this.isLoading = false;
            },
            error: err => console.error(err.message)
        });

        this.subTwo = this.friendsService.getUsers().subscribe({
            next: (users: any) => {
                this.users = users;
                this.users = this.users.filter((x: User) => x._ownerId !== userId);
                // console.log('this.users', this.users);
                
            },
            error: err => console.error(err.message),
            complete: () => {
                this.friendsService.getFriends(userId).subscribe({
                    next: (data: any) => {
                        if(data) {
                            this.friends = data;
                            this.friends = this.friends?.map((x: any) => ({...x.friendData}));
                            // console.log("friends", this.friends);

                            this.friends.forEach((friend: any) => {
                                // console.log('eachfriend', friend);
                                
                                this.activitiesService.getUserActivities(friend._ownerId).subscribe({
                                    next: (activities: any) => {
                                        const currentActivities = activities.map((x: any) => ({...x, "friendImage": friend.img, "friendName": friend.name}))
                                        this.activities = [...this.activities, ...currentActivities, ]
                                        this.activities.sort((a:any, b:any) => a._createdOn - b._createdOn);
                                        this.activities = this.activities.slice(0, 10);
                                        // console.log("user activity", currentActivities);
                                        // console.log("all users activities", this.activities);
                                    },
                                    error: err => console.error(err.message)
                                })
                                this.users = this.users.filter(x => x._ownerId !== friend._ownerId);
                            })
                        }  
                    },
                    error: err => console.error(err.message)
                })
            }
        })
    }

    ngOnDestroy(): void {
        this.subOne.unsubscribe();
        this.subTwo.unsubscribe();
    }
}
