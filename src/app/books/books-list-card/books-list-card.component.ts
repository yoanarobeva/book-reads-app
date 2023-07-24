import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-books-list-card',
  templateUrl: './books-list-card.component.html',
  styleUrls: ['./books-list-card.component.css']
})
export class BooksListCardComponent {
  @Input() bookList: any;
}
