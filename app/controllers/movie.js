var _ = require('underscore')
var Movie = require('../models/movie')
var Comment = require('../models/comment')


//detail page
exports.detail = function(req,res){
  var id = req.params.id
  Movie.findById(id,function (err,movie) {
    Comment
      .find({movie:id})
      .populate('from','name')
      .populate('reply.from reply.to','name') 
      .exec(function(err,comments){
        //console.log(comments)
        res.render('detail',{
              title:'详情',
              movie:movie,
              comments:comments
            })
      }) 
  })
}

//admin page
exports.admin = function(req,res){
  res.render('admin',{
    title:'添加电影',
    movie:{
      title:"",
      doctor:"",
      country:"",
      language:'',
      year:'',
      flash:'',
      summary:'',
      poster:''
    }
  })
}

//admin update movie
exports.update = function(req,res){
   var id = req.params.id 
   if(id){
      Movie.findById(id,function(err,movies){
        res.render('admin',{
          title:'后台更新页',
          movie:movies
        })
      })
    }  
}


// admin post movie
exports.save = function (req,res) {
  var id = req.body.movie._id
  var movieObj = req.body.movie
  var _movie
  if(id !== ''){
    Movie.findById(id,function(err,movies){
      if(err){
        console.log(err)
      }
      _movie = _.extend(movies,movieObj)
      _movie.save(function(err,movies){
        if(err){
        console.log(err)
        }
        res.redirect('/movie/'+ movies._id)
      })
    })
  }else{
    _movie = new Movie({
       doctor:movieObj.doctor,
       title:movieObj.title,
       language:movieObj.language,
       flash:movieObj.flash,
       poster:movieObj.poster,
       summary:movieObj.summary,
       year:movieObj.year,
       country:movieObj.country
    })
    _movie.save(function(err,movies){
        if(err){
          console.log(err)
        }
        res.redirect('/movie/'+ movies._id)
    })
  }
}



//list page
exports.list = function(req,res){
  Movie.fetch(function(err,movies){
      if(err){
        console.log(err)
      }
      res.render('list',{
        title:'电影列表',
        movies:movies
      })
  }) 
}

//list delete movie
exports.del = function(req,res){
   var id  = req.query.id
   if(id){
    Movie.remove({_id:id},function(err,movies){
      if(err){
        console.log(err)
      }else{
        res.json({success:1})
      }
    })
   }
}
