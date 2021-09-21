var express = require("express")
var app = express()
const{MongoClient,ObjectId} = require('mongodb')
const url ='mongodb://localhost:27017/';
app.use(express.urlencoded({extended:true}))
app.use(express.json())
var path = require("path");
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/uploads')
    },
    filename: function (req, file, cb) {
        console.log("file in filename function::",file)
        var fileext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + fileext)
    }
})
const upload = multer({ storage: storage })
app.use(express.static(__dirname+"/uploads"))
app.get("/stu",function(req,res){
    MongoClient.connect(url,function(err,con){
        var db = con.db("merit")
        db.collection('students').find().toArray(function(err,data){
            console.log(data)
            res.send(data)
        })
    })
})
app.post("/addstudent",upload.single("profilepic"),function(req,res){
    console.log("req.file",req.file);    
    req.body.profilePic = req.file.filename;
    console.log("req.body",req.body);
    MongoClient.connect(url,function(err,con){
        var db = con.db("merit")
        db.collection('students').insertOne(req.body,function(err,data){
            console.log(data)
            res.send(data)
        })
    })
})
app.post("/addStudentWeight",function(req,res){
    MongoClient.connect(url,function(err,conn){
        console.log(req.body)
        var db = conn.db("merit");
        db.collection("students")
        .updateOne(
            {_id:ObjectId(req.body.id)},
            {
                $push:{
                    weightEntry:{
                        date:req.body.date,
                        weight:req.body.weight
                    }
                },
                $set:{
                    height:req.body.height
                }
            },
            function(err,data){
                console.log(data)
                //res.redirect("/stu")
                res.send(data)
            }
        )
    })
})
app.get("/deletestudent/:id",function(req,res){
    MongoClient.connect(url,function(err,con){
        var db = con.db("merit")
        db.collection('students').deleteOne({_id:ObjectId(req.params.id)},function(err,data){
            res.send(data)
        })
        //res.redirect("/stu")

    })
})
app.post("/addprofilepic",upload.single("profilepic"),function(req,res){
    MongoClient.connect(url,function(err,conn){
        console.log(req.body)
        req.body.profilePic = req.file.filename;
        var db = conn.db("merit");
        db.collection("students")
        .updateOne(
            {_id:ObjectId(req.body.id)},
            {
                $set:{
                    profilePic:req.body.profilePic
                }
            },
            function(err,data){
                console.log(data)
               // res.redirect("/stu")
               res.send(data)
            }
        )
    })
})
app.listen(9090,function(){console.log("listening on 9090")})
