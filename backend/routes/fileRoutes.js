const express=require('express');
const {post}=require('../config/uploadFileMulter');
const {createFile}=require('../controller/fileControllers');
const uploadFileMulter = require('../config/uploadFileMulter');
const fileRouter=express.Router();
fileRouter.route('/').post(uploadFileMulter.single('file'),createFile);
module.exports=fileRouter;