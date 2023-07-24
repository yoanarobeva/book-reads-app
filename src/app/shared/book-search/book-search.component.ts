import { Component, OnInit, Input } from '@angular/core';
import { ListsService } from 'src/app/lists.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit{
  lists: any;

  @Input('view') isItHomeView: boolean = false;
  
  constructor(private listsService: ListsService) {}

  ngOnInit(): void {
    this.listsService.getAllLists().subscribe({
      next: (lists) => {
        this.lists = lists;
      },
      error(err) {
        console.error(err);
      },
    })
  }
}
