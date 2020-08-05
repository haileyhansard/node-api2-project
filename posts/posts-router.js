const express = require('express');

const Posts = require('../data/db.js')

const router = express.Router();

//GET	/api/posts	
//Returns an array of all the post objects contained in the database.

router.get('/', (req, res) => {
    Posts.find(req.query)
        .then(posts => {
            console.log(posts)
            res.status(200).json({ query: req.query, data: posts })
        })
        .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

//GET	/api/posts/:id
//Returns the post object with the specified id.
router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        console.log(post)
        if (!post[0]) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(200).json(post)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})
 
module.exports = router;

//this is like default export router 
//exports the component so its available on app