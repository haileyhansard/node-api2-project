const express = require('express');

const Posts = require('../data/db.js');

const router = express.Router();

//GET	/api/posts	
//Returns an array of all the post objects contained in the database.

router.get('/', (req, res) => {
    Posts.find(req.query)
        .then(posts => {
            console.log(posts)
            res.status(200).json({ data: posts })
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

//GET	/api/posts/:id/comments
//Returns an array of all the comment objects associated with the post with the specified id.
router.get('/:id/comments', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        console.log(post)
        if(!post[0]) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            Posts.findPostComments(req.params.id)
            .then(comments => {
                if (!comments[0]) {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                } else {
                    res.status(200).json(comments)
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ error: "The comments information could not be retrieved." })
            })
        }
    })
    .catch(err => {
        console.log(err)
    })
});

//POST	/api/posts 
//Creates a post using the information sent inside the request body.
router.post('/', (req, res) => {
    Posts.insert(req.body)
    .then(postid => {
        console.log(postid)
        Posts.findById(postid.id)
            .then(newPost => {
                res.status(201).json(newPost)
            })
            .catch(err => {
                console.log(err)
            })
    })
    .catch(err => {
        console.log(err)
        if (!req.body.title || !req.body.contents) {
            return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        } else {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        }
    })
});

//POST	/api/posts/:id/comments	
//Creates a comment for the post with the specified id using information sent inside of the request body.
// router.post('/:id/comments', (req, res) => {
//     const information = {...req.body, post_id: req.params.id}
//     Posts.insertComment(information)
//     .then(commentId => {
//         console.log(commentId)
//         Posts.findCommentById(commentId.id)
//         .then(comment => {
//             res.status(201).json(comment)
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     })
//     .catch(err => {
//         console.log(err)
//         Posts.findById(req.params.id)
//         .then(post => {
//             console.log(post)
//             if(!post[0]){
//                 res.status(404).json({ message: "The post with the specified ID does not exist." })
//             } else if (!req.body.text) {
//                res.status(400).json({ errorMessage: "Please provide text for the comment." })
//             } else {
//                 res.status(500).json({ error: "There was an error while saving the comment to the database" })
//             }

//         })
//         .catch(err => {
//             console.log(err)
//         })
//     })
// });

router.post('/:id/comments', (req, res) => { 
    if(!req.body.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else if (req.body.text) {
        console.log(req.params.id)
        Posts.findById(req.params.id)
            .then(post => {
                if (post.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
                } else {
                Posts.insertComment(req.body)
                    .then(comment => {
                        res.status(201).json(comment);
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({error: "There was an error while saving the comment to the database" });
                    });
                }
            })
            .catch(error => {
            console.log(error)
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
            })
    };
});

    // Posts.findById(req.params.id)
    //     .then(comment => console.log(comment))
        // {
        //     if(req.body.text) {
        //         Posts.insertComment(req.body.text)
        //         .then(comment => res.status(201).json(comment))
        //         .catch(err => {
        //             console.log(err)
        //             res.status(500).json({ error: "The comments information could not be retrieved."})
        //         })
        //     } else {
        //         res.status(400).json({errorMessage: "Please provide text for the comment." })
        //     }
        // })
//         .catch(res.status(404).json({ message: "The post with the specified ID does not exist." }))
// });

//MARYAM'S CODE BELOW FROM TL GROUP
// router.post("/:id/comments", (req, res) => {
//     if (!req.body.text) {
//       res.status(400).json({ errorMessage: "Please provide text for the comment." });
//     } else if (req.body.text) {
//       Posts.findById(req.params.id)
//       .then(post => {
//         if (post.length === 0) {
//           res.status(404).json({ message: "The post with the specified ID does not exist." })
//         } else {
//           Posts.insertComment(req.body)
//             .then(comment => {
//               res.status(201).json(comment);
//             })
//             .catch(error => {
//               console.log(error);
//               res.status(500).json({error: "There was an error while saving the comment to the database" });
//             });
//         }
//       })
//       .catch(error => {
//         console.log(error);
//         res.status(500).json({ error: "The post information could not be retrieved." })
//       })
//     } 
// });







//PUT	/api/posts/:id	
//Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put('/:id', (req, res) => {
    if(!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Posts.update(req.params.id, req.body)
        .then(allUpdatedPosts => {
            console.log(allUpdatedPosts)
            Posts.findById(req.params.id)
            .then(updatedPost => {
                if(allUpdatedPosts > 0) {
                    res.status(200).json(updatedPost)
                } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The post information could not be modified." })
        })
    }
});

//DELETE	/api/posts/:id	
//Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
    .then(allDeletedPosts => {
        console.log(allDeletedPosts)
        if(allDeletedPosts > 0) {
            res.status(200).json({ message: "The post was successfully deleted." })
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The post could not be removed" })
    })
});

module.exports = router;

//this is like default export router 
//exports the component so its available on;