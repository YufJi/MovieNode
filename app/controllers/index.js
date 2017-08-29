var fs = require("fs");
var path = require("path");
var Movie = require('../models/movie')
var media = path.join(__dirname,"../../public/music");

exports.index = function(req,res){
    Movie.fetch(function(err,movies){
      if(err){
        console.log(err)
      }
      // res.json({data: movies})
      res.render('index',{
        title: '首页',
        movies: movies,
      })
    })
}

exports.music = function(req, res) {
  fs.readdir(media,function(err,names){
      if(err){
        console.log(err);
      }else{ 
        res.render('music',{title:'My MusicBox',music: names})
      }
  }); 
}

