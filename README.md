# Trello Clone

A simple clone of Trello created with React and plain CSS. This app is connected to an API created with Nodejs/Express and a postgreSQL database.

<!-- ## Project Screen Shot(s) -->

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`

To Start Server:

`npm run start`

To Visit the Live App:

`https://trello-clone-mu.vercel.app/`

## Reflection

Goals for building this project included using technologies learned from the Bloc full stack web development bootcamp. The project was started with `create-react-app` boilerplace and utilizes `react-router`.

One of the biggest challenges creating this application was making an Authorization system with JWT's. JWT's are created on the server upon an existing user logging in, and are stored in session storage. JWT's expire and the user is logged out automatically if the user goes ideal. This was done by adding event listeners for user interaction with the web page and setting a timer that triggers a function to log out the user if none of the event listeners are triggered for a certain period of time.
