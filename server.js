const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname +'/web-page'));


app.use((req,res,next) =>{
  var now=new Date().toString();
  var logValue=`${now}: ${req.method} ${req.url}`;
console.log(logValue);
  fs.appendFile('server.log',logValue+'\n');
  next();
});

//app.use((req,res,next)=>{
//  res.render('maintain.hbs');
//});

hbs.registerHelper('currentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('bigText',(text) => {
return text.toUpperCase();
});


app.get('/',(req,res) =>{
  //res.send('<h1>Hello Express</h1>');
  res.send({
    name:'Rohit',
    detail:[
      'address',
      'profession'
    ]
  });
});

app.get('/home',(req,res) =>{
  //res.send('About page');
  res.render('home.hbs',{
    titleName:'home',
    subject:'home Page title'
  });
});

app.get('/about',(req,res) =>{
  //res.send('About page');
  res.render('about.hbs',{
    titleName:'About',
    subject:'About Page title'
  });
});

app.get('/bad',(request,response) =>{
  response.send({
    errorMsg:'Unable to connect'
  });
});

app.listen(3000,()=>{
 console.log('Server is on in port no 3000');
});
