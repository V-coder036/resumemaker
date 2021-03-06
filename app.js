
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const alert = require('alert')
var pdf = require ('html-pdf');
var options = { 
  format:'A4',  
 }

const homeStartingContent = "All resumes can be found here";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-shardul:m0ng0m0ng0@cluster0-rvofo.mongodb.net/resumeDB?retryWrites=true&w=majority", {useNewUrlParser: true});

const postSchema = {
  template: Number,
  name: String,
  email: String,
  phoneno: String,
  address: String,
  portlink: String,
  sname1 : String,
  squal1 : String,
  sinfo1 : String,
  sname2 : String,
  squal2 : String,
  sinfo2 : String,
  skill1 : String,
  skill2 : String,
  skill3 :String,
  skill4 :String,
  skill5 : String,
  skill6 : String,
  persprof: String,
  wname1:String,
  wtime1:String,
  wdesc1:String,
  wname2:String,
  wtime2:String,
  wdesc2:String,
  wname3:String,
  wtime3:String,
  wdesc3:String,
  pname1 :String,
  ptime1:String,
  pdesc1:String,
  pname2 :String,
  ptime2:String,
  pdesc2:String,
  pname3 :String,
  ptime3:String,
  pdesc3:String
};

const userSchema = {
  email:{
    type:String,
    unique:true,
    required:true},
  password:{
    type:String,
    minlength:8,
    match:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
    required:true}
}

const User= mongoose.model("User", userSchema)

const Post = mongoose.model("Post", postSchema);


app.get('/', function(req,res){
  res.render('index');
})

app.get('/login', function(req,res){
  res.render('login')
})

app.get('/register', function(req,res){
  res.render('register')
})

app.post('/register', function(req,res){
  const newUser = new User ({
    email:req.body.username,
    password:req.body.password
  })
  
  newUser.save(function(err){
    if (err){
      console.log(err)
      alert('Invalid data')
      res.redirect('/register')    
    }
    else {      
      res.redirect('/home');
    }
  })
})

app.post('/login', function(req,res){
  
  const username = req.body.username
  const password = req.body.password

  User.findOne({email:username}, function(err, foundUser){
    if(err){
      alert('Invalid credentials')
      console.log(err)
    }else {
      if(foundUser) {
        if (foundUser.password === password){
          res.redirect('/home')
        }
        else {
          alert('Invalid credentials')
          res.redirect('/login')
          
        }
      }
      else {
        alert ('Invalid credentials')
        res.redirect('/login')
        
      }
    }
  })
})

  app.get("/home", function(req, res){
  
    Post.find({}, function(err, posts){
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
        });
    });
  
  
});



app.get("/compose", function(req, res){
  res.render("compose",{
    clickHandler1:"func1();",
    clickHandler2:"func2();",
    clickHandler3:"func3();",
    clickHandler4:"func4();",
    clickHandler5:"func5();"
  });
});

app.post("/compose", function(req, res){
  const post = new Post({
    template: req.body.whichtemp,
    name: req.body.fname,
    email: req.body.email,
    phoneno:req.body.pno,
    address:req.body.addr,
    portlink: req.body.portlink,
    sname1 : req.body.sname1,
    squal1 : req.body.sdegree1,
    sinfo1 : req.body.sinfo1,
    sname2 : req.body.sname2,
    squal2 : req.body.sdegree2,
    sinfo2 : req.body.sinfo2,
    skill1 : req.body.skill1,
    skill2 : req.body.skill2,
    skill3 :req.body.skill3,
    skill4 :req.body.skill4,
    skill5 : req.body.skill5,
    skill6 : req.body.skill6,
    persprof: req.body.persprof,
    wname1:req.body.wname1,
    wtime1:req.body.wtime1,
    wdesc1:req.body.wdesc1,
    wname2:req.body.wname2,
    wtime2:req.body.wtime2,
    wdesc2:req.body.wdesc2,
    wname3:req.body.wname3,
    wtime3:req.body.wtime3,
    wdesc3:req.body.wdesc3,
    pname1 :req.body.pname1,
    ptime1:req.body.ptime1,
    pdesc1:req.body.pdesc1,
    pname2 :req.body.pname2,
    ptime2:req.body.ptime2,
    pdesc2:req.body.pdesc2,
    pname3 :req.body.pname3,
    ptime3:req.body.ptime3,
    pdesc3:req.body.pdesc3
    });
  const nid = post._id
  if (post.template === 1){
    res.render('template', {
      name:post.name,
      email:post.email,
      phoneno:post.phoneno,
      address:post.address,
      portlink: post.portlink,
      sname1 : post.sname1,
      squal1 : post.squal1,
      sinfo1 : post.sinfo1,
      sname2 : post.sname2,
      squal2 : post.squal2,
      sinfo2 : post.sinfo2,
      skill1 : post.skill1,
      skill2 : post.skill2,
      skill3 :post.skill3,
      skill4 :post.skill4,
      skill5 : post.skill5,
      skill6 : post.skill6,
      persprof: post.persprof,
      wname1:post.wname1,
      wtime1:post.wtime1,
      wdesc1:post.wdesc1,
      wname2:post.wname2,
      wtime2:post.wtime2,
      wdesc2:post.wdesc2,
      wname3:post.wname3,
      wtime3:post.wtime3,
      wdesc3:post.wdesc3,
      pname1 :post.pname1,
      ptime1:post.ptime1,
      pdesc1:post.pdesc1,
      pname2 :post.pname2,
      ptime2:post.ptime2,
      pdesc2:post.pdesc2,
      pname3 :post.pname3,
      ptime3:post.ptime3,
      pdesc3:post.pdesc3
    }, function(err, html){
      pdf.create(html, options).toFile('./public/pdfs/'+nid+'.pdf', function(err,res){
        if(err){
          console.log(err)
        }
        else {
          console.log(res)
        }
      })
    })
  }
  else if (post.template === 2){
    res.render('template2', {
      name:post.name,
      email:post.email,
      phoneno:post.phoneno,
      address:post.address,
      portlink: post.portlink,
      sname1 : post.sname1,
      squal1 : post.squal1,
      sinfo1 : post.sinfo1,
      sname2 : post.sname2,
      squal2 : post.squal2,
      sinfo2 : post.sinfo2,
      skill1 : post.skill1,
      skill2 : post.skill2,
      skill3 :post.skill3,
      skill4 :post.skill4,
      skill5 : post.skill5,
      skill6 : post.skill6,
      persprof: post.persprof,
      wname1:post.wname1,
      wtime1:post.wtime1,
      wdesc1:post.wdesc1,
      wname2:post.wname2,
      wtime2:post.wtime2,
      wdesc2:post.wdesc2,
      wname3:post.wname3,
      wtime3:post.wtime3,
      wdesc3:post.wdesc3,
      pname1 :post.pname1,
      ptime1:post.ptime1,
      pdesc1:post.pdesc1,
      pname2 :post.pname2,
      ptime2:post.ptime2,
      pdesc2:post.pdesc2,
      pname3 :post.pname3,
      ptime3:post.ptime3,
      pdesc3:post.pdesc3
    }, function(err, html){
      pdf.create(html, options).toFile('./public/pdfs/'+nid+'.pdf', function(err,res){
        if(err){
          console.log(err)
        }
        else {
          console.log(res)
        }
      })
    })
  }
  
  post.save(function(err){
    if (!err){
      setTimeout(function(){
        res.redirect('/home')   
      }, 8000)
           
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render('resume', {
      id:post._id,
      name:post.name,
      email:post.email,
      phoneno:post.phoneno,
      address:post.address,
      portlink: post.portlink,
      sname1 : post.sname1,
      squal1 : post.squal1,
      sinfo1 : post.sinfo1,
      sname2 : post.sname2,
      squal2 : post.squal2,
      sinfo2 : post.sinfo2,
      skill1 : post.skill1,
      skill2 : post.skill2,
      skill3 :post.skill3,
      skill4 :post.skill4,
      skill5 : post.skill5,
      skill6 : post.skill6,
      persprof: post.persprof,
      wname1:post.wname1,
      wtime1:post.wtime1,
      wdesc1:post.wdesc1,
      wname2:post.wname2,
      wtime2:post.wtime2,
      wdesc2:post.wdesc2,
      wname3:post.wname3,
      wtime3:post.wtime3,
      wdesc3:post.wdesc3,
      pname1 :post.pname1,
      ptime1:post.ptime1,
      pdesc1:post.pdesc1,
      pname2 :post.pname2,
      ptime2:post.ptime2,
      pdesc2:post.pdesc2,
      pname3 :post.pname3,
      ptime3:post.ptime3,
      pdesc3:post.pdesc3
    });
  });
});

app.get("/edit/:postId", function(req,res){
  const reqPostId = req.params.postId;
  Post.findOne({_id:reqPostId}, function(err,post){
    res.render('edit',{
      ch1:"func1();",
      ch2:"func2();",
      ch3:"func3();",
      ch4:"func4();",
      ch5:"func5();",
      id:post._id,
      template:post.template,
      name:post.name,
      email:post.email,
      phoneno:post.phoneno,
      address:post.address,
      portlink: post.portlink,
      sname1 : post.sname1,
      squal1 : post.squal1,
      sinfo1 : post.sinfo1,
      sname2 : post.sname2,
      squal2 : post.squal2,
      sinfo2 : post.sinfo2,
      skill1 : post.skill1,
      skill2 : post.skill2,
      skill3 :post.skill3,
      skill4 :post.skill4,
      skill5 : post.skill5,
      skill6 : post.skill6,
      persprof: post.persprof,
      wname1:post.wname1,
      wtime1:post.wtime1,
      wdesc1:post.wdesc1,
      wname2:post.wname2,
      wtime2:post.wtime2,
      wdesc2:post.wdesc2,
      wname3:post.wname3,
      wtime3:post.wtime3,
      wdesc3:post.wdesc3,
      pname1 :post.pname1,
      ptime1:post.ptime1,
      pdesc1:post.pdesc1,
      pname2 :post.pname2,
      ptime2:post.ptime2,
      pdesc2:post.pdesc2,
      pname3 :post.pname3,
      ptime3:post.ptime3,
      pdesc3:post.pdesc3
    })
  })
  
})

app.post("/edit/:postId", function(req,res){
  const updateId = req.params.postId
  const filter = { _id:updateId };
  const update = {
    template : req.body.whichtemp,
    name: req.body.fname,
    email: req.body.email,
    phoneno:req.body.pno,
    address:req.body.addr,
    portlink: req.body.portlink,
    sname1 : req.body.sname1,
    squal1 : req.body.sdegree1,
    sinfo1 : req.body.sinfo1,
    sname2 : req.body.sname2,
    squal2 : req.body.sdegree2,
    sinfo2 : req.body.sinfo2,
    skill1 : req.body.skill1,
    skill2 : req.body.skill2,
    skill3 :req.body.skill3,
    skill4 :req.body.skill4,
    skill5 : req.body.skill5,
    skill6 : req.body.skill6,
    persprof: req.body.persprof,
    wname1:req.body.wname1,
    wtime1:req.body.wtime1,
    wdesc1:req.body.wdesc1,
    wname2:req.body.wname2,
    wtime2:req.body.wtime2,
    wdesc2:req.body.wdesc2,
    wname3:req.body.wname3,
    wtime3:req.body.wtime3,
    wdesc3:req.body.wdesc3,
    pname1 :req.body.pname1,
    ptime1:req.body.ptime1,
    pdesc1:req.body.pdesc1,
    pname2 :req.body.pname2,
    ptime2:req.body.ptime2,
    pdesc2:req.body.pdesc2,
    pname3 :req.body.pname3,
    ptime3:req.body.ptime3,
    pdesc3:req.body.pdesc3  
  }
  templatenumb = update.template
  if (templatenumb === '1'){
    console.log('yes')
    res.render('template',update, function(err, html){
      pdf.create(html, options).toFile('./public/pdfs/'+updateId+'.pdf', function(err,res){
        if(err){
          console.log(err)
        }
        else {
          console.log(res)
        }
      })
    })
  }
  else if (templatenumb === '2'){
    res.render('template2',update, function(err, html){
      pdf.create(html, options).toFile('./public/pdfs/'+updateId+'.pdf', function(err,res){
        if(err){
          console.log(err)
        }
        else {
          console.log(res)
        }
      })
    })
  }
  
  Post.findOneAndUpdate(filter, update, function(err, docu, res){
    docu.save()    
  })
  setTimeout(function(){
    res.redirect('/home')
  }, 6000)
  
})
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
