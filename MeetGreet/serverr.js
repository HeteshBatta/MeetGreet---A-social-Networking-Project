var express = require('express')
var path = require('path')
var app = express()
var session = require('express-session');
var ejs = require('ejs');
var fs = require('fs');
var http = require('http');
var nodemailer = require('nodemailer');
var multer = require('multer');
var passport = require('passport');
app.use(express.static(path.join(__dirname, 'public')));
var filename;
var commpic;
var valueofa;
var valueofcomm;
//Bodyparser
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({secret: "xYUCAchitkaraa"}));
//Connect with db
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/myDB';

app.use(passport.initialize());
app.use(passport.session());


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
    usertype : String ,
    status : String ,
    isactive : String ,
    photopath : String ,
    commsin : Array ,
    commsreq : Array
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
  CommunityLocation : String ,
  CommunityOwner : String ,
  CreateDate : String ,
  commpic : String ,
  description : String ,
  members : Array ,
  requested : Array
})

var communitydb = mongoose.model('communities' , communityschema);

app.post('/search',function (req, res)
{
  console.log(req.body.username+req.body.password)
  user.find
  ({
       users : req.body.username ,
       password : req.body.password
  })
  .then(data =>
    {
      console.log(data);
      req.session.isLogin = 1;
      req.session.id = data[0]._id;
      req.session.username = data[0].users;
      req.session.email = data[0].email;
      req.session.phoneno = data[0].phoneno;
      req.session.dob = data[0].dob;
      req.session.city = data[0].city;
      req.session.gender = data[0].gender;
      req.session.usertype = data[0].usertype;
      req.session.status = data[0].status;
      req.session.photopath = data[0].photopath;
      res.send(data);
    })
    .catch(err => {
      console.error(err)
      res.send(error)
    })
})

const storage1 = multer.diskStorage({
  destination: './public/communitypics',
  filename: function(req, file, cb){
    commpic =  req.session.commname1 + path.extname(file.originalname);
    cb(null,req.session.commname1 + path.extname(file.originalname));
  }
});


const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req, file, cb){
    filename = req.session.email + path.extname(file.originalname);
    cb(null,req.session.email + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('profilePhoto');


const upload1 = multer({
  storage: storage1,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('communitypic');
// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

app.get('/success', (req, res) => res.render('userDetails'));
app.get('/error', (req, res) => res.render("linkedin"));


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

var middleFunc = function(req, res, next){
    if(req.session.isLogin){

      next();
   } else {
     //Ask for id password
     res.redirect("linkedin");
  //   next();
   }

  }

const GitHubStrategy = require('passport-github').Strategy;

const GITHUB_CLIENT_ID = "817252d322961b27469e"
const GITHUB_CLIENT_SECRET = "c03fa81e3da9af0e02d535d96cf9749d83a1de46";

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
  }
));

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success');
  });


  app.post('/upload1', (req, res) =>
  {
    console.log("upload start");
    upload1(req, res, (err) => {
      if(err)
      {
        console.log(err);
        res.send();
      }
      else
      {
        if(req.file == undefined)
        {
          console.log(req.file);
          console.log("image undefined");
          res.send();
        }
        else
        {
        console.log("done");
        commpic = filename;
        console.log(commpic);
        console.log(req.session.photopath);
        res.render('createCommunity',{
          file:`communitypics`
        });
        }
      }
    });
  });


app.post('/upload', (req, res) =>
{
  console.log("upload start");
  filename = req.session.email + '.png';
  upload(req, res, (err) => {
    if(err)
    {
      console.log(err);
      res.send();
    }
    else
    {
      if(req.file == undefined)
      {
        console.log(req.file);
        console.log("image undefined");
        res.send();
      }
      else
      {
      console.log("done");
      console.log(req.session.photopath);
      res.render('Usereditinfo',{
        msg:"file uploaded",
        file:`${req.session.photopath}`
        // res.send();
      });
      res.render('Userdetails');
      }
    }
  });
});

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

app.post('/dtsearchh1' , function (req,res)
{
  console.log(req.body.status);
  user.find
  ({
  status : req.body.status
  })
  .then(data =>
  {
    res.send(data);
    console.log(data);
  })
})

app.post('/getinfoforddofcommunity' , function (req,res)
{
  console.log(req.body.membershiprule);
  communitydb.find
  ({
  MembershipRule : req.body.membershiprule
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

app.post('/addcomm' , function(req,res)
{
  console.log(req.body);
  req.session.commname1 = req.body.comm;
  let newcomm = new communitydb({
    name : req.body.comm ,
    CommunityOwner : req.session.username ,
    description : req.body.description ,
    MembershipRule : req.body.rule  ,
    CommunityLocation : 'Not Added' ,
    CreateDate : req.body.createdate ,
    commpic : '/communitypics/'+req.body.comm+'.png'
  })
  newcomm.save()
   .then(data => {
     console.log(data+"**")
     res.send(data)
   })
   .catch(err => {
     console.error(err)
     res.send(error)
   })
});

app.post('/valueofa' , function(req,res)
{
  valueofa = req.body.avalue;
})

app.post('/valueofcomm' , function(req,res)
{
  valueofcomm = req.body.valueofclickedcommunity;
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

app.post('/getmemberdetails' , function(req,res)
{
  console.log(req.body.email);
  user.find
  ({
  email : req.body.email
  })
  .then(data =>
  {
    res.send(data);
  })
})

app.get('/Userchangepassword' , middleFunc , (req,res)=>
{
  res.render('UserChangePassword');
})

app.get('/Allcommunity' , middleFunc , (req,res)=>
{
  res.render('Allcommunitiespage');
})

app.get('/discussionPage' , middleFunc , (req,res)=>
{
  res.render('discussionpage');
})


app.get('/communities' , middleFunc , (req,res)=>
{
  res.render('communitylist');
})

app.get('/ownedcommunitypage' , middleFunc , (req,res)=>
{
  res.render('ownedcommunitypage');
})

app.get('/templating' ,  middleFunc ,(req,res)=>
{
  res.render('horizontaldiv');
})

app.get('/communitydetails' , middleFunc , (req,res)=>
{
  res.render('communitydetails');
})

app.get('/ASUcreatecommunity' ,  middleFunc ,(req,res)=>
{
  res.render('ASUcreatecommunity');
})

app.get('/ASUchangepass' ,  middleFunc ,(req,res)=>
{
  res.render('ASUchangepassword');
})

app.get('/ASUmaincommunitypage' ,  middleFunc ,(req,res)=>
{
  res.render('ASUmaincommunitypage');
})

app.get('/ASUdetails' , middleFunc , (req,res)=>
{
  res.render('ASUdetails');
})


app.get('/taglistpage' ,  middleFunc ,(req,res)=>
{
  res.render('taglistpagemain');
})

app.get('/userlist' , middleFunc , (req,res)=>
{
  res.render('datatables');
})

app.get('/getdata' ,  middleFunc ,function(req,res)
{
  res.send(req.session);
});

app.get('/communitypage' ,  middleFunc , (req,res)=>
{
  res.render('maincommunitypage');
})

app.get('/createCommunity' ,  middleFunc ,(req,res)=>
{
  res.render('createCommunity');
})


app.get('/useredit' ,  middleFunc , function(req,res)
{
  res.render('Usereditinfo')
})

app.get('/templates' , middleFunc , (req,res)=>
{
  res.render('addusermain');
})

app.get('/changepassword' ,  middleFunc , (req,res)=>
{
  res.render('changepass');
})

app.get('/linkedin' , (req,res)=>
{
  res.render('linkedin');
})

app.get('/userDetails' ,  middleFunc ,(req,res)=>
{
  res.render('Userdetails');
})

app.get('/tags' ,  middleFunc ,(req,res)=>
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
    usertype : req.body.Usertype ,
    status : 'Pending' ,
    isactive : 'no' ,
    photopath : '/uploads/logo.png'
  })
  newUser.save()
   .then(data => {
     // console.log(data)
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
    pass: //your password
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

app.post('/updateinfo' , function(req,res)
{
    console.log(req.body);
    var myquery = { users : req.session.username };
    var newvalue = {$set:{dob : req.body.dob , gender : req.body.gender , status : req.body.status , photopath : req.session.photopath}};
    console.log(filename+"****");
    user.updateOne(myquery,newvalue,function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
})
})

app.get('/getinfo', middleFunc ,function(req,res)
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

app.get('/userothercomms', middleFunc ,function(req,res)
{
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

app.post('/getcommunitydata',(req,res)=>{
    var search=req.body.search;
    var findobj={  CommunityOwner:{'$ne' : req.session.username},
    members:{'$nin':[req.session.email]},
    requested : {'$nin' :[req.session.email]}
      };
    if(search!='')
        findobj["$or"]= [{
        "name":  { '$regex' : search, '$options' : 'i' }
    }, {
        "CommunityOwner":{ '$regex' : search, '$options' : 'i' }
    },{
        "description": { '$regex' : search, '$options' : 'i' }
    }]
    else{
        delete findobj["$or"];
    }
    communitydb.find(findobj)
    .then(data=>res.send(data)).catch(err=>res.send(err));


    });


app.get('/getinfoforcommunity', middleFunc ,function(req,res)
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

app.post('/gettingmembersofcommunity',function(req,res)
{
  console.log(req.body.Members);
  communitydb.find({
    name : {$in:req.body.Members}
  })
  .then(data =>
  {
        console.log(data+"**")
    res.send(data);
  })
  .catch(err =>{
    console.log(err)
    res.send(err)
  })
})


app.get('/userownedcomms', middleFunc ,function(req,res)
{
    communitydb.find
    ({
      CommunityOwner : req.session.username
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


app.post('/join1',function (req, res) {
 console.log(req.body.type);
   user.findOneAndUpdate(
    {
       email: req.session.email // search query
    },
    {
        $push: { commsin:req.body.info  }
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
    .then(data =>
      {
        console.log(data)
        commedal(req.body.type,req.body.info,req.session.email);
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
})

app.post('/join2',function (req, res) {

 console.log(req.body.type);

   user.findOneAndUpdate(
    {
       email: req.session.email // search query
    },
    {

                $push: { commsreq:req.body.info  }

    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
    .then(data => {
        console.log(data)
commedal(req.body.type,req.body.info,req.session.email);
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
})


function commedal(a,b,c)
{
if(a=='JOIN')
{
  communitydb.findOneAndUpdate(
    {
       name: b // search query
    },
    {
      $push: { members: c }
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
    .then(data => {
        console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
}
else{
 communitydb.findOneAndUpdate(
    {
       name: b
    },
    {
      $push: { requested:c }
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
    .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.error(err)
      })
}
}

app.get('/getinfofortag',  middleFunc ,function(req,res)
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
app.get('/getcommunitydetails' ,  middleFunc ,function(req,res){
communitydb.find({
  name : valueofa
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

app.get('/getownedcommunitydetails' ,  middleFunc , function(req,res){
communitydb.find({
  name : valueofcomm
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

app.get('/getpassword', middleFunc , function(req,res){
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

app.get('/gettags', middleFunc , function(req,res){
  console.log(req.session)
    tagdb.find({
         // search query
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
