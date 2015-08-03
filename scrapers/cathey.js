var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

//
 // URL: http://univofchicago.campusdish.com/Commerce/Catalog/Menus.aspx?LocationId=1604&PeriodId={period}&MenuDate={date}&UIBuildDateFrom={build_date}
 // periods - 296 = breakfast, 297 = lunch, 298 = dinner
 // date - the date to get the data from - format is YYYY-MM-DD
// build_date - date UI is built from - doesn't really matter, keep the same as {date}
//

// START OUT BY JUST SCRAPING THAT DAY'S FOOD



var date = moment().format("YYYY-MM-DD");

var urlBreakfast = "http://univofchicago.campusdish.com/Commerce/Catalog/Menus.aspx?LocationId=1604&PeriodId=296&MenuDate=" + date;

var urlLunch = "http://univofchicago.campusdish.com/Commerce/Catalog/Menus.aspx?LocationId=1604&PeriodId=297&MenuDate=" + date;

var urlDinner = "http://univofchicago.campusdish.com/Commerce/Catalog/Menus.aspx?LocationId=1604&PeriodId=298&MenuDate=" + date;

var data = {
  "breakfast" : null,
  "lunch"     : null,
  "dinner"    : null
};

function parseLoadedData(html) {
  var $ = cheerio.load(html);
  // go through the menu sections (Desserts, Harvest, etc.)
  var children = $("#RenderMenuDetailsSection").children();
  var sectionTitle = "";
  var sectionDishes;
  var toReturn = []
  for(var i = 0; i < children.length; i++) {
    var section = $(children[i]).children();
    sectionTitle = section.first().html();
    sectionDishes = [];
    //iterate through the dishes in each section
    var dishes = section.find(".menu-name");
    for(var j = 0; j < dishes.length; j++) {
      var dishName = $(dishes[j]).children().first().html();
      sectionDishes.push(dishName);
    }
    var o = Object();
    o['name'] = sectionTitle;
    o['dishes'] = sectionDishes;
    toReturn.push(o);
  }
  return toReturn;
}

function parseLunch() {
  request(urlLunch, function(error, response, html) {
    if(!error) {
      data.lunch = parseLoadedData(html);
    }
    parseDinner();
  });
}

function parseDinner() {
  request(urlDinner, function(error, response, html) {
    if(!error) {
      data.dinner = parseLoadedData(html);
    }
    callBack();
  });
}

function callBack() {
  console.log(data);
  var toFile = JSON.stringify(data, null, 2);
  fs.writeFile("cathey.json", toFile);
}

request(urlBreakfast, function(error, response, html) {
  if(!error) {
    data.breakfast = parseLoadedData(html);
  }
  parseLunch();
});
