var express = require('express');
var router = express.Router();
var Admin = require('../models/adminModel');
var matches = require('../models/matchModel')
var users = require('../models/userModels')
var votes = require('../models/votes')

const adminVerify = (req, res, next)=>{
  if(req.sesion.Logedin){
    const adminId = req.session.userId
    const admin = Admin.findOne({_id:adminId});
    if(admin){
      next()
    }else{
      res.redirect('/')
    }
  }else{
    res.redirect('/')
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('adminHome',{layout:'adminLayout.hbs'});
});
router.get('/creatematch',adminVerify, function(req, res, next) {
  res.render('adminCreate',{layout:'adminLayout.hbs'});
});
router.get('/user',adminVerify, function(req, res, next) {
  res.render('adminUser',{layout:'adminLayout.hbs'});
});
router.get('/deletematch/:id',adminVerify,async function(req, res, next) {
  const matchId = req.query.id;
  try{
    await matches.deleteOne({_id:matchId}).then((data)=>{
      res.send('deleted');
    }).catch((err)=>{
      console.log(err);
      res.send('error occured');
    })
  }catch(err){
    console.log(err);
    res.send('error occured')
  }
});
router.get('/user', function(req, res, next) {
  try{
    const users = users.find({});
    res.send(users)
  }catch(err){
    console.log(err);
    res.send(err)
  }
});
router.post('/creatematch',adminVerify,async(req, res)=>{
  const {team1, team2, image, time, active } = req.body;

  try{
    const match = new matches({
      team1:team1,
      team2:team2,
      image:image,
      time:time,
      active:active
    })
    await match.save().then((data)=>{
      res.send('successfully created')
    }).catch((err)=>{
      console.log(err);
      res.send('some error occured')
    })
  }catch(err){
    res.send('some internal error occured')
  }
})
router.post('/userdelete/:id',adminVerify,async(req, res)=>{
  const userId = req.query.id;
  try{
    await users.deleteOne({_id:userId}).then((data)=>{
      res.send('successfully deleted')
    }).catch((err)=>{
      console.log(err);
      res.send('internal error')
    })
  }catch(err){
    console.log(err);
    res.send('internal error')
  }
})
router.post('/userban/:id',adminVerify,async(req, res)=>{
  const userId = req.query.id;
  try{
    await users.updateOne({_id:userId},{active:false}).then((data)=>{
      res.send('successfully banned')
    }).catch((err)=>{
      console.log(err);
      res.send('internal error')
    })
  }catch(err){
    console.log(err);
    res.send('internal error')
  }
})
router.post('/complete/:id',adminVerify,async(req, res)=>{
  const matchId = req.query.id;
  try{
    const vote = votes.find({matchId:matchId});
    for(i=0 ; i<vote.length-1; i++){
      await users.updateOne({_id:votes[i].userId},{points:points+1})
    }
    await votes.deleteMany({matchId:matchId});
    res.send('successfull')
  }catch(err){
    console.log(err);
    res.send('internal eror')
  }
})

module.exports = router;