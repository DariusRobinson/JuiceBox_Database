const express = require('express');
const postsRouter = express.Router();
const { getAllPosts } = require('../db');
const { requireUser } = require('./utils');
const {createPost} = require("../db");

postsRouter.use((req, res, next) => {
    console.log("A request is being made to /posts");
  
    next(); 
  });
  
  postsRouter.get('/', async (req, res) => {
      const posts = await getAllPosts();
    
      res.send({
        posts
      });
    });
  
    // postsRouter.post('/', requireUser, async (req, res, next) => {
    //   res.send({ message: 'under construction' });
    // });

    

    postsRouter.post('/', requireUser, async (req, res, next) => {
      const { title, content, tags = "" } = req.body;
    
      const tagArr = tags.trim().split(/\s+/)
      const postData = {};
    
      // only send the tags if there are some to send
      if (tagArr.length) {
        postData.tags = tagArr;
      }
    


      try {
        // add authorId, title, content to postData object
         // const post = await createPost(postData);
         // this will create the post and the tags for us
         // if the post comes back, res.send({ post });
         // otherwise, next an appropriate error object 
        
         const { authorId, title, content }=postData

        // postData={
        // authorId,
        // title,
        // content
        // }

        const post = await createPost(postData);

      if(post){
        res.send({ post });
      }
      
      // usersRouter.post('/register', async (req, res, next) => {
      //   const { username, password, name, location } = req.body;
      
      //   try {
      //     const _user = await getUserByUsername(username);
      
      //     if (_user) {
      //       next({
      //         name: 'UserExistsError',
      //         message: 'A user by that username already exists'
      //       });
      //     }
      
      //     const user = await createUser({
      //       username,
      //       password,
      //       name,
      //       location,
      //     });
      
      //     const token = jwt.sign({ 
      //       id: user.id, 
      //       username
      //     }, process.env.JWT_SECRET, {
      //       expiresIn: '1w'
      //     });
      
      //     res.send({ 
      //       message: "thank you for signing up",
      //       token 
      //     });
      //   } catch ({ name, message }) {
      //     next({ name, message })
      //   } 
      // });


       
      } catch ({ name, message }) {
        next({ name, message: "No post to display" });
      }
    });

module.exports = postsRouter;