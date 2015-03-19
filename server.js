var http        = require("http");
var url         = require("url");
var path        = require("path");
var fs          = require("fs");
var express     = require("express");
var app         = express();
var cons        = require("consolidate");
var logger      = require("morgan");
var yaml        = require("js-yaml");
var bodyparser  = require("body-parser");
var cookparser  = require("cookie-parser");
var mu          = require("mu2");
var sass        = require("node-sass");

//initialize html renderer
app.engine('html', cons.mustache);
app.set('view engine', 'html');
app.set("view options", {layout: false});
app.set('views', __dirname + '/html');
mu.root = __dirname + "/html";

//read config
configdata = fs.readFileSync("config.yml");
config = yaml.safeLoad(configdata);
config.port = process.argv[2] || config.port || 8000; //server port

//create console logger
app.use(logger('dev'));

//create regex params
app.param(function(name, fn){
  if (fn instanceof RegExp) {
    return function(req, res, next, val){
      var captures;
      if (captures = fn.exec(String(val))) {
        req.params[name] = captures;
        next();
      } else {
        next('route');
      }
    }
  }
});
//app.param('id', /^([a-zA-Z0-9]){8}$/);
//app.param('file', /^((?!(\.\.)|(\/)|(\\)).)*$/); //any filename and extension

//initialize reply parsers
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cookparser());

//send JSON
function sendjson(json, res)
{
  var s = JSON.stringify(json);
  res.writeHead(200, { 'Content-Type': 'application/json',
                       'Content-Length': s.length });
  res.end(s);
  res.send();
}

//render SASS
function renderSass(cb) {
  sass.render({
    file: 'sass/main.scss',
    success: function(data) {
      fs.writeFile('css/main.css', data.css, function() {
        console.log("SASS   : " + "main.css compiled");
        cb();
      });
    },
    error: function(err) {
      console.log("SASS   : " + "main.css failed - " + err.message);
      console.log(err);
      cb();
    }
  });
}
renderSass(function() { });

function renderMain(res) {
  res.render('index', {
    redirect: '/contact',
    partials: {
      container: 'loading'
    }
  });
}

//serve LIVE UPDATE
app.get('/live', function (req, res) {
  mu.clearCache();
  renderSass(function() { renderMain(res); });
});

//serve INDEX
app.get('/', function (req, res) {
  renderMain(res);
});

//server PAGES
app.param('page', /^(profile|projects|contact|blog).*$/); //any page (no extension)
app.get('/:page', function(req, res) {
  var s = "";
  var page = req.params.page[0];
  mu.compileAndRender(page + '.html', {
  })
  .on('data', function(data) {
    s += data.toString();
  })
  .on('end', function() {
    sendjson({ html: s }, res);
  });
});

//serve static files
app.use('/img', express.static(__dirname + '/img'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use('/js', express.static(__dirname + '/js'));

//listen
app.listen(config.port);
console.log("SERVER : Ready on port " + config.port);
