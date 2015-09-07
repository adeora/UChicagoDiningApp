var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

var app = express();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database/database.db');

var query = "SELECT dishes.name, dishes.vegetarian, dishes.vegan," +
 " sections.sectionName, sections.sectionWhen FROM dishes JOIN sections ON " +
 "dishes.section=sections.id;";

app.get('/allData', function(req, res) {
  db.all(query, function(err, rows) {
    if (!err) {
      console.log(rows);
      res.setHeader('Content-Type', 'application/json');
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.send(JSON.stringify(rows));
    } else {
      console.log(err);
    }
  });
});

app.listen('8081');
exports = module.exports = app;
