var express = require("express")
var fortune = require('./lib/fortune.js')

var app = express();

var handlebars = require("express3-handlebars").create({defaultLayout:'main'});
// 视图搜索引擎handlebars,默认会返回text/html的内容和200状态码。而再
//  catch-all中（提供定制的404页面）以及500处理器必须明确指定状态码
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT || 3000);

// static中间件可以将一个或多个目录指派为包含静态资源的目录，其中的资源不经过任何特殊处理直接发送给客户端，
//      可以图片，CSS文件，客户端javascript文件等。 
// static中间件相当于给你想要发送的所有静态文件创建了一个路由，渲染文件并发送给客户端
app.use(express.static(__dirname + '/public'));
// 路由和中间件的顺序很重要

// 动态信息，发送虚拟幸运饼干在about.handlebars


//路由
// app.get是我们添加路由的方法
// 再express文档中写的是app.VERB，但这并不意味着存在一个叫VERB的方法，他用来指代HTTP动词（常见的get,post）
// app.VERB做了很多，忽略大小写，反斜杠，不考虑查询字符串
app.get("/",function(req,res){
    // res.type("text/plain");
    // res.send("MeaDowlark Travel");
    res.render('home')
})

// var fortunes = [
//     "Conquer you fears or they will conquer you.",
//     "Rivers needs springs.",
//     "Do not fear what you donot know.",
//     "Whenever possible, keep it simple."
// ]


app.get("/about",function(req,res){
    // res.type("text/plain");
    // res.send("About meadowlark travel")
    // Math.random() * 10 % fortunes.length
    // var attr = Math.floor(Math.random() * fortunes.length);
    // var randomFortune = fortunes[attr];
    // res.render("about",{'fortune':randomFortune,"Attr":attr})
    res.render("about",{fortune:fortune.getFortune})
})

// app.use是express添加中间件的一个方法，现在可以把它看作处理所有没有 路由匹配路径的处理器
//定制404页面
app.use(function(req,res,next){
    // res.type("text/plain");
    // res.status(404);
    // res.send('404 - Not Found...');
    res.status(404);
    res.render("404");
})

//定制500页面（内部服务器错误）
app.use(function(err,req,res,next){
    // console.log(err.stack);
    // res.type('text/plain');
    // res.status(500);
    // res.send("500 - Server Error");
    console.log(err.stack);
    res.status(500);
    res.render("500");
})


app.listen(app.get('port'),function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate...')
})


