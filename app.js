require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require("cors");
var app = express();
app.use(cors())




const httpServer = require("http").createServer(app);
const io = require('socket.io')(httpServer)



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





io.on("connection", (socket) => {
  console.log("socket.io user is Connected");

  socket.on('disconnect', () => {
    console.log("user disconnected");
  });

});




app.use('/', require('./routes/index'));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({
    error:"404 page not found"
  })
});




app.listen(8000,()=>{
  console.log("server is running at port 8000...");
})


module.exports = app;
