export interface User {
    "_id": string,
    "email": string,
    "hashedPassword": string,
    "role": string,
    "name": string,
    "age": string,
    "city": string,
    "img": string,
    "_createdOn": string | number,
    "accessToken"?: string,
}