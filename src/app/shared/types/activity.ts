import { Book } from "./book";

export interface Activity {
    "_id": string,
    "_ownerId": string,
    "activity": string,
    "listId": string,
    "bookId": string,
    "_createdOn": string,
    "friendName"?: string,
    "friendImage"?: string,
    "book"?: Book,
}