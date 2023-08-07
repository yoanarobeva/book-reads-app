import { User } from "./user";

export interface Friend {
    "_id": string,
    "_ownerId": string,
    "friendId": string,
    "_createdOn": string,
    "friendData"?: User,
}