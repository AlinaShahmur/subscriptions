# Subscriptions
## Movies and Subscription Management SPA
The application allow us to manage Movies and Subscription System, make CRUD operations with Movie, Member and Subscription objects.
In order to start to interact with data we need to authenticate.

The technologies I used in project: 
1. HTML5
2.  CSS3
3. Java Script
4. React
5. NodeJS
6. Express
7. NPM
8. MongoDB

Because of multiply repeated components in application and my purpose to create single page application, I intended to use Create-React-app environment.
NoSql database MongoDb is very suit for scalable data.
Express is very perfect solution for creating application. It has many plugins and NPM packages that turn creating server-side API to very easy process.

My challenge was to make the least number of interactions with server-side from client in order to prevent slow application loading. Instead of two requests from client from two different tables, 
on the server side I applied population data from one table to another one.
