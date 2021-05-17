var express = require("express");
var app = express();
const client = require('prom-client');
const promBundle = require("express-prom-bundle");

var cors = require('cors');

var Feed = require('rss-to-json');

const register = new client.Registry();

register.setDefaultLabels({
  app: 'feed'
});

client.collectDefaultMetrics({ register });

const port = process.env.PORT || 8080;

const urls = ["https://www.reddit.com/r/sysadmin/.rss", "https://www.reddit.com/r/programming/.rss", "https://news.ycombinator.com/rss"];

const getRandomFeedUrl = () => {
    const randomUrlIndex = Math.floor(Math.random() * urls.length);
    return urls[randomUrlIndex];

}

app.use(cors());

app.get("/ping", (req, res, next) => {
    res.send('pong');
});

app.get("/cpu-metrics", async (req, res, next) => {
	try {
		res.set('Content-Type', register.contentType);
		res.end(await register.metrics());
	} catch (ex) {
		res.status(500).end(ex);
	}
});

const metricsMiddleware = promBundle({includeMethod: true});
app.use(metricsMiddleware);

app.get("/api/feed", (req, res, next) => {
    const url = getRandomFeedUrl();
    Feed.load(url).then(response => {
        res.json(response);
    });
});

var server = app.listen(port, () => {
    console.log("Server running on port " + port);
});

module.exports = server;