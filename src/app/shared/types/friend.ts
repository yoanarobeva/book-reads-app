import { User } from "./user";

export interface Friend {
    "_id": string,
    "_ownerId": string,
    "friendId": string,
    "_createdOn": string,
    "friendData"?: User,
    "friendshipId"?: string,
    "email"?: string,
    "hashedPassword"?: string,
    "name"?: string,
    "age"?: string,
    "city"?: string,
    "img"?: string,
}