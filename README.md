My Smart To Do
=========

## Project Introduction

Welcome to the Smart-To-Do list!
This app allows you to add your task without specifying the category, it will do it for you! 
The app categorize tasks into 4 categories: To Eat, To Read, To watch and To Buy. You can simply enter the name of the task and the app will smartly add it to where it belongs. For example, when you enter 'Starbucks', the app will auto categorize it as an restaurant and add the task under that category.
You can also click on each task and retrieve the related task details fetched automatically by the app.



## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- BODY-PARSER 1.20
- CHALK 2.4.2
- CORS 2.8.5
- EXPRESS 4.16.1
- MORGAN 1.9.1
- REQUESTY-PROMISE-NATIVE 1.0.9
- YELP-FUSION 3.0.0
- SASS 1.35.1


## Showcase

Auto-Categorizing: Restaurant
!["Auto-Categorizing: Restaurants"](https://github.com/BENcao318/SmartToDoList/tree/master/docs/Auto-categorizing_%20Restaurants.gif)

Auto-Categorizing: Books
!["Auto-Categorizing: Books"](https://github.com/BENcao318/SmartToDoList/blob/master/docs/Auto-Categorizing_%20books%20.gif)

Auto-Categorizing: Videos
!["Auto-Categorizing: Videos"](https://github.com/BENcao318/SmartToDoList/blob/master/docs/Auto-Categorizing_%20videos.gif)

Auto-Categorizing: Products
!["Auto-Categorizing: Products"](https://github.com/BENcao318/SmartToDoList/blob/master/docs/Auto-Categorizing_%20products.gif)

Edit Category
!["Change Category"](https://github.com/BENcao318/SmartToDoList/blob/master/docs/Change%20Category.gif)

Details Fetching
!["Details Fetching"](https://github.com/BENcao318/SmartToDoList/blob/master/docs/details%20fetching.gif)

Delete Card
!["Delete Card"](https://github.com/BENcao318/SmartToDoList/blob/master/docs/Delete%20card.gif)

Drag and Drop
!["Drag and Drop"](https://github.com/BENcao318/SmartToDoList/blob/master/docs/Drag%20and%20Drop.gif)

