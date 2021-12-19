
const express = require("express"); //includes express modules
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//tells express what to do when route "/" is requested
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
    
    });
    

//When user makes a post request,then it'll catch the request 
app.post("/", function(req,res) {
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=0434539aac5bdf3800ec301f76b07538&units=metric";
    //make get request to external server
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            // console.log(data); - Hexadecimal format
            const weatherData = JSON.parse(data); //Parses strings to JS object
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write(" <p>The weather is currently " + description +" </p>");
            res.write(" <h1>The temperature of "+ query+" is " + temp + " degree celsius </h1>");
            
            res.write("<img src =" + imageURL + ">");
            res.send();
        })
        
    });
    
});



app.listen(3000, function(req, res) {
    console.log("Server running at 3000");
});