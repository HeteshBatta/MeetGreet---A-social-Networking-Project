var express = require('express')
var path = require('path')
var app = express()
var session = require('express-session');
var ejs = require('ejs');
var fs = require('fs');
var http = require('http');
var nodemailer = require('nodemailer');
app.use(express.static(path.join(__dirname, 'public')));

//Bodyparser
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({secret: "xYUCAchitkara"}));
//Connect with db
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/myDB';

mongoose.connect(mongoDB);

mongoose.connection.on('error', (err) => {
    console.log('DB connection Error');
});

mongoose.connection.on('connected', (err) => {
    console.log('DB connected');
});

var userSchema = new mongoose.Schema
({
    users : String ,
    password : String ,
    email : String ,
    phoneno : String ,
    dob : String ,
    city : String ,
    gender : String ,
    usertype : String
})

var user =  mongoose.model('users', userSchema);

var tagschema = new mongoose.Schema
({
  name : String ,
  by : String ,
  createdate : String
})

var tagdb = mongoose.model('tags' , tagschema);

var communityschema = new mongoose.Schema
({
  name : String ,
  MembershipRule : String ,
  CommuntiyLocation : String ,
  CommuntiyOwner : String ,
  CreateDate : String
})

var communitydb = mongoose.model('communities' , communityschema);

app.post('/search',function (req, res)
{
  user.find
  ({
       users : req.body.username ,
       password : req.body.password
  })
  .then(data =>
    {
      req.session.isLogin = 1;
      req.session.username = data[0].users;
      req.session.email = data[0].email;
      req.session.phoneno = data[0].phoneno;
      req.session.dob = data[0].dob;
      req.session.city = data[0].city;
      req.session.gender = data[0].gender;
      req.session.usertype = data[0].usertype;
      res.send(data);
    })
    .catch(err => {
      console.error(err)
      res.send(error)
    })
})

app.post('/dtsearch1' , function (req,res)
{
  console.log(req.body.usertype);
  user.find
  ({
  usertype : req.body.usertype
  })
  .then(data =>
  {
    res.send(data);
    console.log(data);
  })
})

app.post('/dtsearch2' , function (req,res)
{
  console.log(req.body.usertype);
  user.find
  ({
  usertype : req.body.usertype ,
  status : req.body.status
  })
  .then(data =>
  {
    res.send(data);
  })
})


app.post('/addtag' , function(req,res)
{
  console.log(req.body);
  let newtag = new tagdb({
    name : req.body.tag ,
    by : req.session.username ,
    createdate : req.body.time
  })
  newtag.save()
   .then(data => {
     console.log(data+"**")
     res.send(data)
   })
   .catch(err => {
     console.error(err)
     res.send(error)
   })
});

app.post('/deletetag' , function(req,res)
{
  console.log(req.body.tagname + "**");
  var myquery = { name : req.body.tagname };
  tagdb.deleteOne(myquery, function(err, obj)
  {
    if (err) throw err;
    console.log("1 document deleted");
  });
})

app.get('/Userchangepassword' , (req,res)=>
{
  res.render('UserChangePassword');
})

app.get('/communities' , (req,res)=>
{
  res.render('communitylist');
})

app.get('/templating' , (req,res)=>
{
  res.render('horizontaldiv');
})

app.get('/taglistpage' , (req,res)=>
{
  res.render('taglistpagemain');
})

app.get('/userlist' , (req,res)=>
{
  res.render('datatables');
})

app.get('/getdata' , function(req,res)
{
  res.send(req.session);
});

app.get('/templates' , (req,res)=>
{
  res.render('addusermain');
})

app.get('/changepassword' , (req,res)=>
{
  res.render('changepass');
})

app.get('/linkedin' , (req,res)=>
{
  res.render('linkedin');
})

app.get('/userDetails' , (req,res)=>
{
  res.render('Userdetails');
})

app.get('/tags' , (req,res)=>
{
  res.render('tags');
})

app.post('/addUser',function (req, res)
{
  console.log(req.body);
  let newUser = new user({
    users : req.body.name ,
    password : req.body.password ,
    email : req.body.email ,
    phoneno : req.body.phone ,
    dob : req.body.dob ,
    city : req.body.city ,
    gender : 'Male' ,
    usertype : req.body.Usertype
  })
  newUser.save()
   .then(data => {
     console.log(data)
     res.send(data)
   })
   .catch(err => {
     console.error(err)
     res.send(error)
   })
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'meetgreet12@gmail.com',
    pass: 'meetgreet123!'
  }
});

var mailOptions = {
  from: 'meetgreet12@gmail.com',
  to: req.body.email,
  subject: 'Welcome to MeetGreet',
  text: 'Welcome to MeetGreet! Have a nice day ! - Hetesh Batta'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
})

app.post('/updatepass' , function(req,res)
{
    var myquery = { users : req.body.user };
    var newvalue = {$set:{password : req.body.oldp}};
    user.updateOne(myquery,newvalue,function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    console.log(req.body.oldp);
})
})

app.get('/getinfo',function(req,res)
{
  //console.log(req.session)
    user.find
    ({

    })
    .then(data => {
        //console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
})

app.get('/getinfoforcommunity',function(req,res)
{
  //console.log(req.session)
    communitydb.find
    ({

    })
    .then(data => {
        //console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
})

app.get('/getinfofortag',function(req,res)
{
  //console.log(req.session)
    tagdb.find
    ({

    })
    .then(data => {
        //console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
})

app.get('/getpassword',function(req,res){
  console.log(req.session)
    user.find({
         // search query
        users : req.session.username
    })
    .then(data => {
        console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
})

app.listen(8000)
