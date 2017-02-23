var Movie = require('../models/movie')
var Category = require('../models/category')

exports.index = function(req,res){
    Movie.fetch(function(err,movies){
      if(err){
        console.log(err)
      }
      res.render('index',{
        title:'首页',
        movies:movies
      })
    })
}
