var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engine = require('ejs-mate');
var flash = require('connect-flash');
var session = require('express-session');
var expressValidator = require('express-validator');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var request = require('request');
//var books = require('./routes/books');

//GENERATE PDF FILE
//var fs = require('fs');
//var pdf = require('html-pdf');
//
//var html = fs.readFileSync('views/contents/roleAudience/consultationAffairesAudience.ejs', 'utf8');
//var options = {format : 'letter'};
//
//pdf.create(html, options).toFile('views/contents/roleAudience/consultationAffairesAudience.pdf', function(err, res){
//  if(err) return console.log(err);
//  console.log(res);
//});
//var angularUiBootstrap = require('angular-ui-bootstrap');
//
//var routeConfiguration = require('./routes/routeConfiguration');
//var users = require('./routes/users');
/////////// END

var app = express();

// FILE UPLOAD
app.use(function(req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('../client'));
app.use(bodyParser.json());

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    //cb(null, file.originalname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    cb(null, file.originalname);
  }
});

var upload = multer({ //multer settings
  storage: storage
}).single('file');

/** API path that will upload the files */
app.post('/upload', function(req, res) {
  upload(req,res,function(err){
    if(err){
      res.json({error_code:1,err_desc:err});
      return;
    }
    res.json({error_code:0,err_desc:null});
  });
});
////////////// END

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'vendors')));
app.use(express.static(path.join(__dirname, 'vendors/plugins')));
app.use(express.static(path.join(__dirname, 'serveur')));
app.use(express.static(path.join(__dirname, 'uploads')));
//app.use('angular-ui-bootstrap', express.static(path.join(__dirname, 'angular-ui-bootstrap')));

//Express session
app.use(session({
  secret : 'secret',
  saveUninitialized : false,
  resave : false
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//PASSPORT CONFIG
passport.use(new LocalStrategy(
    function(username, password, done){
      if(username === password){
        done(null, {id: username, name : username});
        console.log(name);
      }else{
        done(null, null);
      }
      //var dao = require('./serveur/dao/security/securityDao.js')
      //dao.securityDao.getUserByUsername(username, function(rows){
      //  if(!rows){
      //    done(null, false, {message : 'utilisateur inconnu'});
      //    console.log('utilisateur inconnu');
      //  }
      //  if(rows){
      //    dao.securityDao.comparePassword(password, function(rows){
      //      if(rows){
      //        done(null, {id: username, name : username});
      //      }else{
      //        done(null, false, {message : 'Nom utilisateur ou mot de passe inconnu'});
      //        console.log('Nom utilisateur ou mot de passe inconnu');
      //      }
      //    })
      //  }
      //})
    }
));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, {id:id, name:id});
});
//END CONFIG

//AUTHENTICATION ROUTE
app.get('/', function(req, res){
    res.render("security/login",
        {
          isAuthenticated : req.isAuthenticated(),
          user : req.user
        });
});

app.get('/ouvrirSession_url', function(req, res){
    res.render('accueil', {
      title: 'Bienvenu',
      label : "Administration",
      isAuthenticated : req.isAuthenticated(),
      user : req.user
    })
});

app.get('/login', function(req, res){
  res.render("security/login");
});

app.post('/login', passport.authenticate('local', {successRedirect:'/ouvrirSession_url', failureRedirect:'/login', failureFlash:true}),
    function(req, res){
      res.redirect('/ouvrirSession_url');
    }
);
//END ROUTE

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

//Express validator
app.use(expressValidator({
  errorFormator : function(param, msg, value){
    var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

    while(namespace.length){
      formParam += '[' +namespace.shift()+ ']';
    }

    return{
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));

//connect flash
app.use(flash());

//Global variable
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//app.use('/books', books);


// configuration des routes
var routeConfiguration = require('./routes/routeConfiguration');
new routeConfiguration(app);

var typeIndividuRouteConfiguration = require('./routes/typeIndividuRouteConfiguration');
new typeIndividuRouteConfiguration(app);

var affaireRouteConfiguration = require('./routes/affaireRouteConfiguration');
new affaireRouteConfiguration(app);

var individuRouteConfiguration = require('./routes/individuRouteConfiguration');
new individuRouteConfiguration(app);

var natureRouteConfiguration = require('./routes/natureRouteConfiguration');
new natureRouteConfiguration(app);

var chambreRouteConfiguration = require('./routes/chambreRouteConfiguration');
new chambreRouteConfiguration(app);

var concernerRouteConfiguration = require('./routes/concernerRouteConfiguration');
new concernerRouteConfiguration(app);

var reglementConfiguration = require('./routes/reglementConfiguration');
new reglementConfiguration(app);

var roleAudienceConfiguration = require('./routes/roleAudienceConfiguration');
new roleAudienceConfiguration(app);

var jugementRouteConfiguration = require('./routes/jugementRouteConfiguration');
new jugementRouteConfiguration(app);

var agentRouteConfiguration = require('./routes/agentRouteConfiguration');
new agentRouteConfiguration(app);

var coursRouteConfiguration = require('./routes/coursRouteConfiguration');
new coursRouteConfiguration(app);

var salleAudienceRouteConfiguration = require('./routes/salleAudienceRouteConfiguration');
new salleAudienceRouteConfiguration(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


var http = require('http');
var jsreport = require('jsreport');

//http.createServer(function (req, res) {
//  jsreport.render({ template: { shortid: "SJgt_iPt", engine: 'jsrender', recipe: 'phantom-pdf' } }).then(function(out) {
//    out.stream.pipe(res);
//  }).catch(function(e) {
//    res.end(e.message);
//  });
//
//}).listen(1337, '127.0.0.1');


module.exports = app;
