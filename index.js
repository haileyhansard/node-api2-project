const express = require('express');

const postsRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());



// request handler
server.get('/', (req, res) => {
    res.send("Server is up and running!");
});

//server.use routes created in postsRouter
server.use("/api/posts", postsRouter)

const port = 8000;
server.listen(port, () => {
    console.log(`server running on port ${port}`)
});

///// STEPS /////
// index.js file
// npm i express
// get server is up and running (this project already has node, nodemon installed, and has a gitignore)
//  - require('express') : this imports express
//  - const server = express();
//  - teach server to read json by writing server.user(express.json());
//  - const port = 8000;
//  - server.listen(port, () => { console.log(`server is running on port ${port}`)});
//  - export the router on posts-router.js

