var Movie = require('../app/controllers/movie')
var User = require('../app/controllers/user')
var Index = require('../app/controllers/index')
var Comment = require('../app/controllers/comment')

module.exports = function(app){
  //pre handler
  app.use(function(req,res,next){
    //console.log(req.session.user)
    var _user = req.session.user
    app.locals.user = _user
    next()
  })

  //index page
  app.get('/',Index.index)

  //detail page
  app.get('/movie/:id', Movie.detail)
  //admin page
  app.get('/admin/movie', User.SigninRequired, User.AdminRequired, Movie.admin)
  //admin update movie
  app.get('/admin/update/:id', User.SigninRequired, User.AdminRequired, Movie.update)
  // admin post movie
  app.post('/admin/movie', Movie.save)
  //list page
  app.get('/admin/list', User.SigninRequired, User.AdminRequired, Movie.list)
  //list delete movie
  app.delete('/admin/list', User.AdminMostRequired, Movie.del)

  //user revise
  app.get('/user/update/:id', User.AdminMostRequired, User.revise)
  //post user revise
  app.post('/admin/revise', User.save)
  //signup
  app.get('/signup', User.showsignup)
  app.post('/user/signup', User.signup)
  //signin
  app.get('/signin', User.showsignin)
  app.post('/user/signin', User.signin)
  //logout
  app.get('/logout', User.logout)
  //userlist page
  app.get('/admin/userlist', User.SigninRequired, User.AdminRequired, User.list)
  //user delete
  app.delete('/admin/userlist/del', User.AdminMostRequired, User.del)

  //comment
  app.post('/user/comment', Comment.save)
}
