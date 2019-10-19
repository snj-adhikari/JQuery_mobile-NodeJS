// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');

 var app = express();

// require fild

var nodeConfig = require('./src/setup/node.js');

var dbConfig  = require('./src/setup/db.js')
var Contact  = require('./src/model/contact')



// enabling CORS for all requests
app.use(cors());



app.use('/static',express.static('public'))


// adding morgan to log HTTP requests
app.use(morgan('short'));



mongoose.set('useFindAndModify', false);

app.use(cors());

app.use(bodyParser.json({limit: '10mb'}));


var session = require('express-session');


app.use(bodyParser.urlencoded({extended: true}));

app.options('*', cors());



app.use(bodyParser.json());

app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true}))


//  Seeting express view enjine
app.set('view engine' , 'ejs');


// defining an endpoint to return pages.
app.get('/', (req, res) => {
  var info = {
    msg:'',
    update:false,
    new:false,
    err:false,
    list:[],
  }
  if(req.session){
    if(req.session.info){
      info.msg  = req.session.info.msg;
      info.update  = req.session.info.update;
      info.new  = req.session.info.new;
      info.err  = req.session.info.err;
    }
    
  }
  Contact.find({}, function(err,detail){
    if(err){
      info.err = true;
    }
    else{
      sorted_detail =  detail.sort();
      var sorted_detail= detail.sort(function IHaveAName(a, b) { // non-anonymous as you ordered...
          return b.name < a.name ?  1 // if b should come earlier, push a to end
                : b.name > a.name ? -1 // if b should come later, push a to begin
                : 0;                   // a and b are equal
      });
      info.list = sorted_detail;
    }

    res.render('pages/index' , info);
  });
  
});

app.get('/new' , function(req,res){
  info = {
    msg:"SOrry , error occured while adding new contact",
    update:false,
    new:true,
    err:false,
  }
  res.render('pages/new-form' , info);
});

app.get('/delete/:id', function(req,res){
   Contact.findOneAndRemove({_id:req.params.id}, function(err){
     if(err){
       return res.json({success:false, msg:"Sorry error on removing contact"});
     }
     else{
       return res.json({success:true, msg:"Sucessfully deleted the contact"})
     }
   });
});
app.post('/new' , function(req,res){
  
  // return res.json({success:true , body:req.body});

  var newContact = new Contact(req.body);
  newContact.save( (err)=> {
    if(err){
      info = {
        msg:"SOrry , error occured while adding new contact",
        update:false,
        new:true,
        err:false,
      }
      return res.render('pages/new-form' , info);
    }
    else{
      info={
        msg:"Successfully, updated the contact" , 
        new:true,
        update:false,
        err:false,
      }
      req.session.info = info;
      
      return res.redirect('/');
    }
  });
  
})

app.get('/update/:id' , function(req,res){
   Contact.findOne({
     _id:req.params.id
   },function(err,detail){
    if(err){
      info={
        msg:"Sorry , error occured on update " , 
        new:false,
        update:false,
        err:true,
      }
      req.session.info = info;
      res.redirect('/');
    }
    if(detail){
      
        info={
          msg:"" , 
          new:false,
          update:false,
          err:true,
          contact:detail,
        }
        
      return res.render('pages/update-form' , info);
    }
    else{
      info={
        msg:"Sorry , couldnot update the detail" , 
        new:false,
        update:false,
        err:true,
      }
      req.session.info = info;
      res.redirect('/');
    }
   });
});


app.post('/update/:id' ,function(req,res){
  Contact.findOneAndUpdate({
    _id:req.params.id,
  } ,{
    $set:req.body,
  },{
    upsert:false, 
    new:true,
  }, function(err, contact){
    if(err){
      info={
        msg:"Sorry , error occured on update " , 
        new:false,
        update:false,
        err:true,
      }
      req.session.info = info;
      res.redirect('/');
    }
    if(contact){
      info={
        msg:"Successfully , updated the contact detail" , 
        new:false,
        update:true,
        err:false,
      }
      req.session.info = info;
      res.redirect('/');
    }
    else{
      info={
        msg:"Sorry , couldnot update the detail" , 
        new:false,
        update:true,
        err:false,
      }
      req.session.info = info;
      res.redirect('/');
    }
  });
});

const server = app.listen( nodeConfig.port, "0.0.0.0",function(){

  console.log("We are listening to  :" + nodeConfig.port);
  
      // mongoose.Promise = require('bluebird');
      mongoose.connect(dbConfig.url , { useNewUrlParser: true, useUnifiedTopology: true   },function(err){
          if(err){
              console.log('Coudnot connect to db' , err);
          }
          else{
              console.log("Its connected !!! ");
          }
      });
});