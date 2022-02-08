const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
 const app = express();
 app.use(bodyParser.urlencoded({
     extended: true
 }));

 app.listen(3001,() => "server is up and running");

 app.get("/",(req,res) => {
     res.sendFile(__dirname + "/index.html");
 });

 app.post("/",(req,res) => {
     const querry = req.body.cityName;
     const api_id = "32b823b3f64c149b0c4eb0ebefd8f054";
     const url = "https://api.openweathermap.org/data/2.5/weather?q="+querry+"&units=imperial&lang=en&appid="+api_id;
     https.get(url,(response) => {
         console.log(response);
         response.on("data",(data) => {
            const weatherData = JSON.parse(data);
            const desc = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            res.write("<p> the weather " + desc +"</p>");
            res.write("<h1> tempurature is "+temp +"</h1>");
            res.write("<img src="+ icon+">");
            res.send();
         });
     })

 });


