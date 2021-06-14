// load modules here
const express = require('express');
const exphbs = require('express-handlebars');
// init app
const app = express();
// view engine
app.engine('handlebars',exphbs({
    defaultLayout: 'main'
}));
app.set('view engine','handlebars');
// connect client side to serve css and js files
app.use(express.static('public'));
// create port
const port = process.env.PORT || 3000;
// route handles
app.get('/',(req,res) => {
    res.render('home');
});
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Us'
    });
});
app.get('/contact',(req,res) => {
    res.render('contact',{
        title: 'Contact Us'
    });
});
app.get('/signup',(req,res) => {
    res.render('signupForm',{
        title: 'Register'
    });
});
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});