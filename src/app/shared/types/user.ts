export interface User {
    "_id": string,
    "email": string,
    "hashedPassword": string,
    "name": string,
    "age": string,
    "city": string,
    "img": string,
    "_createdOn": string | number,
    "_ownerId": string,
    "accessToken"?: string,
    "password"? : string,
    "friendshipId"? : string,
}