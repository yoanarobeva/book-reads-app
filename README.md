# BookReadsApp

Angular Final Project

## Overview 

The application is front-end app (SPA). It is light version of the popular [GoodReads.com](https://www.goodreads.com/) and is developed for educational purposes.

The application is about browsing books and (if authenticated) adding them to your shelves as want to read, currently reading or read. You can add new books to the books collection or edit the existing ones. You can also follow other people and track their activities on the application.

*Guests* are very limited in their actions and they can only view the books collection. The application is mainly created to be used by registered users and give them personal experience. 

*Users* may view books collection, add new books and edit/remove the books they have added. But the main functionality is linked with adding books to your shelves. You can choose between "want to read", "currently reading" or "read" shelf. Users can follow other users and track their activities like adding books to their shelves. 

## Public Part

This part of the application is designed for non-registered users. These users have access to the following:

- Guests Home Page -> You can choose books list category to view or you can authenticate to the application for more functionality.
- Browse Books -> You can view the books collection and get more information about current book.

The public part of the application is very limited as the app is designed to give you personal experience.

## Private Part

- Users Home Page -> As an authenticated user you have personal home page. There you can find your "currently reading" book or view your other shelves. You get latest updates on the people you are following. You can also view other users and follow them.
- My Books -> The page is containing all your shelves and books on them.
- Browse Books -> This is the books collection where you can find new books or edit/remove books you have added before.
- Add New Book -> You can add new book to the books collection and have the rights to edit/remove it later.
- Profile Page -> This page shows more information for the current user. There you can find your shelves and view the people you are following.
- Sign Out

Users initialized on server:

- peter@abv.bg : 123456
- george@abv.bg : 123456
- admin@abv.bg : 123456

## Technical Details

The client application is build with:

- Angular CLI: 16.1.4
- TypeScript
- HTML + CSS
- Bootstrap

To run the project:

*package.json* --> `npm install` --> `ng serve` --> navigate to `http://localhost:4200/`

**The server used in the project is [Softuni practice server](https://github.com/softuni-practice-server/softuni-practice-server).**

It was modified to serve to this project. If you want to start the server, read its documentation.