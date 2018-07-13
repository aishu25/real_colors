var express = require("express");
var app = express();
var port = 8000;
var path = require("path");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./public/static")));
app.set("views", path.join(__dirname, "./public/views"));
app.set('view engine', 'ejs');

app.get("/", function(request, response){
	response.render("index");
});

var server = app.listen(port,function(){
	console.log("Listening on port 8000 for the real_colors project")
});

var session = require('express-session');
var app = express()

app.use(session({
	secret: "tHIsIsSecRet",
	resave: "false",
	saveUninitialized: true,
	cookie: {maxAge: 60000}
}))


var io = require("socket.io").listen(server);

var colorGeneral = "pink";


io.on('connection', function (socket) {
    console.log("Client/Server is connected and id is: ", socket.id);
    socket.on('changeGreen', function(){
    	colorGeneral = "green"
    	io.emit("updateAll", {colorGeneral : colorGeneral });
    });

    socket.on('changeBlue', function(){
    	colorGeneral = "blue";
   		io.emit("updateAll", {colorGeneral : colorGeneral });
    })

    socket.on('changeYellow', function(){
    	colorGeneral = "yellow"
    	io.emit("updateAll", {colorGeneral : colorGeneral });
    })

    socket.on("disconnect", function(){
			console.log("Socket " + socket.id + " has disconnected from our real-colors");
		})
});

app.get('/',function(req,res){
	res.render('index')
})








