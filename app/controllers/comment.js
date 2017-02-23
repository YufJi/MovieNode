var Comment = require('../models/comment')

exports.save = function (req,res) {
  var user = req.session.user
  var _comment = req.body.comment
  var movieId = _comment.movie
  console.log(user._id)

  if(_comment.cid){
    Comment.findById(_comment.cid,function(err,comment){
       var reply = {
          from:_comment.from,
          to:_comment.tid,
          content:_comment.content
       }
       comment.reply.push(reply)
       comment.save(function(err,comment){
          if(err){
            console.log(err)
          }
          //res.redirect('/movie/'+ movieId )
          res.json({
                    success:2,
                    name:user.name
                  })
       })
    })
  }else{
      var comment = new Comment(_comment)
      comment.save(function(err,comment){
        if(err){
          console.log(err)
        }
        //res.redirect('/movie/'+ movieId )
        res.json({
                  success:1,
                  name:user.name,
                  content:comment.content,
                  cid:comment._id,
                  tid:user._id
                })
      })
  }

  
}