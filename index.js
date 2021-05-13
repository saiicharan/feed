var express = require("express");
var app = express();
var cors = require('cors');

var Feed = require('rss-to-json');

const port = process.env.PORT || 8080;

const urls = ["https://www.reddit.com/r/sysadmin/.rss", "https://www.reddit.com/r/programming/.rss", "https://news.ycombinator.com/rss"];

const getRandomFeedUrl = () => {
    const randomUrlIndex = Math.floor(Math.random() * urls.length);
    return urls[randomUrlIndex];
}

app.use(cors());

app.get("/feed", (req, res, next) => {
    const url = getRandomFeedUrl();
    Feed.load(url).then(response => {
        res.json(response);
    });
});

app.get("/ping", (req, res, next) => {
    res.send('pong');
});

var server = app.listen(port, () => {
    console.log("Server running on port " + port);
});

module.exports = server;