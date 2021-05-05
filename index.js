var express = require("express");
var app = express();

var Feed = require('rss-to-json');

const urls = ["https://www.reddit.com/r/sysadmin/.rss", "https://www.reddit.com/r/programming/.rss", "https://news.ycombinator.com/rss"];

const getRandomFeedUrl = () => {
    const randomUrlIndex = Math.floor(Math.random() * urls.length);
    return urls[randomUrlIndex];
}

app.get("/feed", (req, res, next) => {
    const url = getRandomFeedUrl();
    Feed.load(url).then(response => {
        res.json(response);
    });
});

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});