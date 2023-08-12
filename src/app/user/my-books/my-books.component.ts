import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ShelvesService } from 'src/app/books/services/shelves.service';
import {Shelf, User } from 'src/app/shared/types';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})

export class MyBooksComponent implements OnInit, OnDestroy {
    userShelves: Shelf[] | undefined;
    wantShelf: Shelf[] = [];
    currentShelf: Shelf[] = [];
    readShelf: Shelf[] = [];
    user!: User;
    private sub!: Subscription;
    isLoading: boolean = false;

    selectedShelf: string = 'all'
    booksOnShelf: Shelf[] = [];
    
    constructor(
        private shelvesService: ShelvesService, 
        private authService: AuthService, 
        private activatedRoutes: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.sub =  this.activatedRoutes.params.subscribe((params: Params) => {
            this.selectedShelf = params['shelfName'];
            this.user = this.authService.user!;
            this.isLoading = true;

            this.shelvesService.getOwnShelves(this.user._id).subscribe({
                next: (data: Shelf[]) => {
                    this.userShelves = data;
                    if(this.userShelves) {
                        this.wantShelf = this.userShelves.filter((x:Shelf) => x.shelf === 'want');
                        this.currentShelf = this.userShelves.filter((x:Shelf) => x.shelf === 'currently');
                        this.readShelf = this.userShelves.filter((x:Shelf) => x.shelf === 'read');

                        if (this.selectedShelf === 'want') {
                            this.booksOnShelf = this.wantShelf;
                        } else if (this.selectedShelf === 'currently') {
                            this.booksOnShelf = this.currentShelf;
                        } else if (this.selectedShelf === 'read') {
                            this.booksOnShelf = this.readShelf;
                        } else {
                            this.booksOnShelf = this.userShelves;
                        }
                    }
                    this.isLoading = false;
                },
                error: err => console.error(err.message)
            });
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
