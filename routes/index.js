var express = require('express');
var router = express.Router();
var matches = require('../models/matchModel')
var users = require('../models/userModels')
var votes = require('../models/votes')

const verifyLogin = (req, res, next)=>{
  if(req.session.logedIn){
    next()
  }else{
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/home', (req, res)=>{
  res.render('home',{layout:'logedLayout'})
})
router.get('/register',(req, res)=>{
  res.render('register')
})
router.get('/points',async(req, res)=>{
  try{
    const user = await users.find({}).lean().sort({points:-1})
    res.render('points',{layout:'logedLayout.hbs',user:user})
  }catch(err){
    console.log(err);
    res.send('internal error')
  }
})
router.get('/profile',verifyLogin,async(req, res)=>{
  const userId = req.session.userId;
  console.log(userId);
  try{
    const user = await users.findOne({_id:userId}).lean();
    console.log(user);
    res.render('profile',{layout:'logedLayout.hbs', user:user})
  }catch(err){
    console.log(err);
    res.send('internal error')
  }
})
router.get('/login',(req, res)=>{
  res.render('login',{layout:'mainLayout'})
})
router.post('/register',async(req,res)=>{
  const {name, team, email, branch, password} = req.body

  if(!name || !email || !password || !team){
    return res.send('necessary details are not filled')
  }
  try{
    const newUser = new users({
      name,
      team,
      email,
      branch,
      password
    })
    await newUser.save().then((data)=>{
      return res.send('registered')
    }).catch((err)=>{
      console.log(err);
      return res.send('error occured')
    })
  }catch(err){
    console.log(err);
    return res.send('some internal error occured')
  }
})
router.post('/login',async(req, res)=>{
  const {email, password} = req.body;
  if(!email || !password){
    return res.send('necessary details are not filled')
  }
  try{
    const user = await users.findOne({email:email})
    if(!user){
      return res.send('user doesnt exist')
    }else{
      console.log(user.password);
      if(password == user.password){
        console.log(req.session);
        req.session.logedIn = true;
        req.session.userId = user._id;
        res.redirect('/home')
      }else{
        return res.send('password incorrect')
      }
    }
  }catch(err){
    console.log(err);
    res.send('some internal error')
  }
})
router.get('login',(req, res)=>{
  console.log('cmplt');
})
router.get('matches',verifyLogin,(req, res)=>{
  try{
    const currentMatches = matches.find({active:true})
    res.send(currentMatches)
  }catch(err){
    res.send('some internal error')
  }
})
router.post('matches',verifyLogin,async(req, res)=>{
  const {matchID, userId} = req.body
  try{
    const Vote = new votes({
      matchID:matchID,
      userId:userId
    })
    await Vote.save().then((data)=>{
      res.send('successful')
    }).catch((err)=>{
      console.log('some error occured');
    })
  }catch(err){
    res.send('some internal error')
  }
})
router.get('tables',verifyLogin,async(req, res)=>{
  try{
    const data = await users.find({}).sort(points)
  }catch(err){
    console.log(err);
    res.send('some error occured')
  }
})
router.get('profile',verifyLogin,async(req, res)=>{
  const userId = req.session.userId
  try{
    const data = await users.findOne({_id:userId});
    res.send(data)
  }catch(err){
    res.send('some error occured')
  }
})
router.post('profile',verifyLogin,(req, res)=>{
  console.log('cmplt');
})

module.exports = router;
