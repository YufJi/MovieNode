var express = require('express')
var path = require('path')
var mongoose =require('mongoose')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var bodyParser = require('body-parser')
var morgan = require('morgan')
var port = 3000
var app = express()
var dburl = 'mongodb://localhost/lalala'

mongoose.connect(dburl)

app.set('views','./app/views/pages')
app.set('view engine','jade')

app.use(bodyParser.json({ limit:'1mb' }))  
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret:'foo',
  store:new mongoStore({
    url:dburl,
    collection:'sessions'
  }),
  cookie:{
          maxAge: 6000000
        },
  resave:true,
  saveUninitialized:false
}))

if('development'===app.get('env')){
  app.set('showStackError',true)
  app.use(morgan(':method :url :status'))
  app.locals.pretty=true
  mongoose.set('debug',true)
}

app.use(express.static(path.join(__dirname,'public')))
app.locals.moment = require('moment')
app.listen(port,function(err){
   if(err){
    console.log(err)
   }
   console.log('server started on 3000')
})

require('./config/routes')(app)