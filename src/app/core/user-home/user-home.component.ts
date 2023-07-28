import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ShelvesService } from 'src/app/books/services/shelves.service';
import { Shelf } from 'src/app/shared/types';

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

    sub!: Subscription

    constructor(private shelvesService: ShelvesService, private authService: AuthService) {}

    ngOnInit(): void {
        const userId = this.authService.user!._id;
        
        this.sub = this.shelvesService.getOwnShelves(userId).subscribe({
            next: (data: any) => {
                this.userShelves = data;
                this.wantShelf = this.userShelves?.filter((x:any) => x.shelf === 'want');
                this.currentShelf = this.userShelves?.find((x:any) => x.shelf === 'currently');
                this.readShelf = this.userShelves?.filter((x:any) => x.shelf === 'read');
                this.isLoading = false;
            },
            error: err => console.error(err.message)
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
