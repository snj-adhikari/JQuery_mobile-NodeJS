const express = require('express')
const app = express()
const port = 300
var body_parser = require('body-parser');
var databaseConfig = require('./config/database');
var serverConfig = require('./config/server-config');
var wine_model = require('./model/wine-db');

var cors= require('cors')
var mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

app.use(cors());

app.use(body_parser.json({limit: '50mb'}));

app.use(body_parser.urlencoded({extended: true}));

app.options('*', cors());



var path = require('path');


app.use('/', express.static(path.join(__dirname, 'view')))


// app.use(body_parser);

app.post('/save' , (req,res) => {
   console.log("the post value is " , req.body);
   if(!req.body.name){
    req.body.name = '-------';
   }
   console.log("after update is" , req.body);
   var wine = new wine_model(req.body);
    
    wine.save(function (err) {
    if (err) return res.json({success:false, msg:"Error on saving the wine"  , err:err})
    // saved!
    
    console.log("Successfully saved on the database");

    return res.json({success:true , msg:"Successfully saved on the database" , wine:wine});

    });
});
app.get('/list' , (req,res)=>{
    wine_model.find({}, (err,items)=>{
        if(err){
            return res.json({success:false , msg:"Sorry error on getting data"});
        }
        if(items){
            return res.json({success:true , item: items , msg:"Successfully recieved data"})
        }
        else{
            return res.json({success:false ,msg:"SOrry no item was found :*"});
        }   
    })
});

app.post("/edit" , (req,res)=> {
  console.log('the id is' , req.headers._id);
  wine_model.findOneAndUpdate({
      _id:req.headers.id,
  },{
      $set:req.body,
  },{
      upsert:false, 
      new:true,
  },(err, updateWine)=>{
      if(err){
          return res.json({success:false ,msg:"sorry error  on wine update" , err:err});
      }
      if(updateWine){
          return res.json({success:true, msg:"Successfully updated the wine" , wine:updateWine});
      }
      else{
          return res.json({success:false , msg:"sorry could not udate wine !! Try again later" , headers:req.headers});
      }
  })
});

app.delete('/delete' , (req,res)=>{
    wine_model.remove({_id:req.headers._id}, (err)=>{
        if(err){
            return res.json({success:false , err:err , msg:"couldnot delete try again !!"})
        }
        else{
            return res.json({success:true , msg:"Successfully deleted the wine"});
        }
    })
})
// app.get('/', (req, res) => res.status(200).json({success:true , msg: 'Hello World!'}))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))


const server = app.listen(process.env.PORT || serverConfig.port, "0.0.0.0",function(){

    console.log("There will be dragon in port :" + serverConfig.port);
    
        // mongoose.Promise = require('bluebird');
        mongoose.connect(databaseConfig.database , { useNewUrlParser: true  },function(err){
            if(err){
                console.log('sorry not connected to db' , err);
            }
            else{
                console.log("connected to db");
            }
        });
});