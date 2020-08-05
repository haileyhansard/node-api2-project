const express = require('express');

const Posts = require('../data/db.js')

const router = express.Router;

//GET	/api/posts	
//Returns an array of all the post objects contained in the database.

// router.get('/', (req, res) => {
//     Posts.find(req.query)
//         .then(posts => {
//             console.log(posts)
//             res.status(200).json({ query: req.query, data: posts })
//         })
//         .catch(err => {
//         console.log(err)
//         res.status(500).json({ error: "The posts information could not be retrieved." })
//         })
// })

//
 
module.exports = router;

//this is like default export router 
//exports the component so its available on app