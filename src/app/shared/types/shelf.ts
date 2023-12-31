import { Book } from "./book";

export interface Shelf {
    "_id": string,
    "_ownerId": string,
    "listId": string,
    "bookId": string,
    "shelf": string,
    "_createdOn": string,
    "bookData"?: Book,
}