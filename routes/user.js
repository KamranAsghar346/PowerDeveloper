require('../db/connectDB')
const router=require('express').Router()
const User = require('../models/User')

router.post('/create', async (req,res) =>{
 try {
  const user = new User(req.body);
  await user.generateAuthToken();
  const createStudent = await user.save();
  res.send(createStudent)
 } catch (error) {
  res.status(400).send(error);
 }
 
})
module.exports=router