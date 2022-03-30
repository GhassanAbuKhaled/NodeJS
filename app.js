const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./moudel/blog');
const app = express();


//connect MangoDB
const dbURI = 'mongodb+srv://GhassanDB:AhN8Lpnnm2EYXs-@cluster0.kts8b.mongodb.net/MyDB?retryWrites=true&w=majority';
mongoose.connect(dbURI).then(
    (result) => console.log('connected to DB'),
    //listen for req
    app.listen(3000))
    .catch((err) => console.log("error \n" + err));
//register view engine
app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded());
// for display info in terminal
app.use(morgan('dev'));

// app.get('/',
//     (req, res) => {
//         res.sendFile('./views/index.html', {root: __dirname});
//     });
//
// app.get('/about',
//     (req, res) => {
//         res.sendFile('./views/about.html', {root: __dirname});
//     });
//
// //redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });
//
// //404
// app.use((req, res) => {
//     res.status(404).sendFile('./views/404.html', {root: __dirname});
// });

// app.get('/add-blog',(req,res)=>{
//
//     const blog = new Blog({
//         title:'Mathe für Informatik',
//         snippet:'6',
//         body:'1.3'
//     });
//
//     blog.save().then((result)=>{
//         res.send(result);
//     }).catch((err)=>{ console.log(err);});
// });


// app.get('/all-blogs',(req,res)=>{
//     Blog.find().then((result) =>{
//         res.send(result)
//     }).catch((err)=>{
//         console.log(err);
//     });
// });

// app.get('/single-blog',(req,res)=>{
//     Blog.findById('62438996898d8c00423cc1d4').then((result) =>{
//         res.send(result)
//     }).catch((err)=>{
//         console.log(err);
//     });
// });

app.get('/',
    (req, res) => {
        res.redirect('/blogs');
    });

app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1}).then((result) => {
        res.render('index', {blogs: result})
    }).catch((err) => {
        console.log(err);
    });
});

app.post('/blogs', (req, res) => {

    console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {

            res.redirect("/blogs");
        })
        .catch((err) => {
            console.log(err)
        });

});
app.get('/about',
    (req, res) => {
        res.render('about');
    });
app.get('/blogs/create',
    (req, res) => {
        res.render('create');
    });
//404
app.use((req, res) => {
    res.status(404).render('404');
});
