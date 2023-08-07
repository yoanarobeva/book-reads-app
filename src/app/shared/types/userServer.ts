export interface UserServer {
    "_id": string,
    "email": string,
    "accessToken": string,
    "hashedPassword"?: string,
    "_createdOn"?: string | number,
    "_ownerId"?: string,
}