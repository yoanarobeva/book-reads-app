import { User } from "./user";

export interface Friend {
    "_id": string,
    "_ownerId": string,
    "friendData"?: User,
}