var _ = require('underscore')
const jsonwebtoken = require('jsonwebtoken')
const jwt = require('express-jwt')
const Cookie = require('js-cookie')
var User = require('../models/user')

//user delete
exports.del = function(req,res){
  var id  = req.query.id
  if(id){
    User.remove({_id:id},function(err,users){
      if(err){
        console.log(err)
      }else{
        res.json({success:1})
      }
    })
  }
}

//user revise
exports.revise = function(req,res){
    var id = req.params.id 
    User.findById(id,function(err,users){
        if(err){
          console.log(err)
        }
        res.render('revise',{
          users:users
        })
    })
}

//post user revise save
exports.save = function(req,res){
  var id = req.body.user._id
  var name = req.body.user.name
  console.log(name);
  var userObj = req.body.user
  var _user
  if(id !== ''){
    User.findById(id,function(err,users){
      if(err){
        console.log(err)
      }
      _user = _.extend(users,userObj)
      _user.save(function(err,users){
        if(err){
        console.log(err)
        }  
        if(req.session.user._id == id ){
          delete req.session.user
        }   
        return res.redirect('/')    
      })
    })
  }

}


//showsignup
exports.showsignup = function(req,res){
   res.render('showsignup')
}

//showsignin
exports.showsignin = function(req,res){
   res.render('showsignin')
} 

//signup
exports.signup = function (req,res) {
    var _user = req.body.user
    User.findOne({name:_user.name},function(err,user){
        if(err){
          console.log(err)
        }
        if(user){
           res.redirect('/')
        }else{
           var user = new User(_user)
           user.save(function (err,users) {
              if(err){
                console.log(err)
              }
              res.redirect('/')
           })
        }
    })   
}

//signin
exports.signin = function(req,res){
    var _user = req.body.user
    var name = _user.name
    var password = _user.password
    User.findOne({name:name},function(err,user){
       if(err){
        console.log(err)
       }
       if(!user){
          return res.redirect('/')
       }
       user.comparePassword(password,function(err,isMatch){
          if(err){
            console.log(err)
          }
          if(isMatch){
            console.log('password is matched')
            req.session.user = user
            return res.redirect('/')
          }else{
            console.log('password is not matched')
            return res.redirect('/')
          }
       })
    })
}

//logout
exports.logout = function (req,res) {
  delete req.session.user
  return res.redirect('/')
}


//userlist page
exports.list = function(req,res){
  User.fetch(function(err,users){
      if(err){
        console.log(err)
      }
      res.render('userlist',{
        title:'用户列表',
        users:users
      })
  })  
}

exports.SigninRequired = function(req,res,next){
  var user = req.session.user
  if(!user){
    return res.json({error:1})
  }
  next()   
}

exports.AdminRequired = function(req,res,next){
   var user = req.session.user
   if(user.role < 30){
      return res.json({error:2})
    }
    next()
}

exports.AdminMostRequired = function(req,res,next){
   var user = req.session.user
   if(user.role < 50){
      return res.json({error:3})
    }
    next()
}