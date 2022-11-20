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
router.get('/register',(req, res)=>{
  res.render('register')
})
router.post('/register',async(req,res)=>{
  const {name, branch, year, email, password, team} = req.body

  if(!name || !email || !password ){
    return res.send('necessary details are not filled')
  }
  try{
    const newUser = new users({
      name:name,
      branch:branch,
      year:year,
      email:email,
      password:password,
      team:team
    })
    await newUser.save().then((data)=>{
      return res.send('registered')
    }).catch((err)=>{
      console.log('reg unsuccessfull');
      return res.send('error occured')
    })
  }catch(err){
    console.log(err);
    return res.send('some internal error occured')
  }
})
router.post('login',(req, res)=>{
  const {email, password} = req.body;
  if(!email || !password){
    return res.send('necessary details are not filled')
  }
  try{
    const users = users.findOne({email:email})
    const hashedPass = ''
    if(!users){
      return res.send('user doesnt exist')
    }else{
      if(password == hashedPass){
        req.session.logedIn = true;
        req.session.userId = users._id;
        res.redirect('/panel')
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
