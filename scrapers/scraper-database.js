var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

// set up the database

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database/database.db');

// set up constants

var date = moment().format("YYYY-MM-DD");

var urlBreakfast = "http://univofchicago.campusdish.com/Commerce/Catalog/Menus.aspx?LocationId=1604&PeriodId=296&MenuDate=" + date;
var urlLunch = "http://univofchicago.campusdish.com/Commerce/Catalog/Menus.aspx?LocationId=1604&PeriodId=297&MenuDate=" + date;
var urlDinner = "http://univofchicago.campusdish.com/Commerce/Catalog/Menus.aspx?LocationId=1604&PeriodId=298&MenuDate=" + date;

// parse the data

function parseLoadedData(html, timeOfDay) {

  // set when the meal actually is
  var time;
  switch (timeOfDay) {
    case 'breakfast':
      time = 0;
      break;
    case 'lunch':
      time = 1;
      break;
    case 'dinner':
      time = 2;
      break;
    default:
      time = -1;
      break;
  }

  // start parsing through the data

  var $ = cheerio.load(html);
  var children = $("#RenderMenuDetailsSection").children();

  db.parallelize(function() {
    for (var i = 0; i < children.length; i++) {
      // for each menu section
      db.serialize(function() {
        var section = $(children[i]).children();
        /** ADD THE SECTION TO sections **/
        var sectionTitle = section.first().html();

        var insertedSectionID;
        db.run('INSERT INTO sections (sectionName, date, sectionWhen) VALUES ($name, $date, $when);', {
          $name: sectionTitle,
          $date: date,
          $when: time
        });

        db.get('SELECT id FROM sections WHERE sectionName=$name AND date=$date AND sectionWhen=$when;', {
          $name: sectionTitle,
          $date: date,
          $when: time
        }, function(err, row) {
          if (!err) {
            insertedSectionID = row['id'];

            // iterate through the dishes in each section
            var dishes = section.find(".menu-name");
            for (var j = 0; j < dishes.length; j++) {

              /*
              var endURLPiece = $(dishes[j]).children().first()['0']['attribs']['href'];
              endURLPiece = endURLPiece.replace(' ', '%20')
              var startURLPiece = "http://univofchicago.campusdish.com";
              var dishNutritionURL = startURLPiece + endURLPiece;
              */

              var dishName = $(dishes[j]).children().first().html();

              var vegetarian = 0;
              var vegan = 0;

              var nutritionalTags = $(dishes[j]).find('.nutritional');
              if(nutritionalTags.length > 0) {
                for(var n = 0; n < nutritionalTags.length; n++) {
                  var alt = nutritionalTags[n].attribs.alt;
                  switch (alt) {
                    case 'Vegetarian':
                      vegetarian = 1;
                      break;
                    case 'Vegan':
                      vegan = 1;
                      break;
                    default:
                      break;
                  }
                }
              }
              
              db.run('INSERT INTO dishes (section, name, vegetarian, vegan) VALUES ($section, $name, $vegetarian, $vegan);', {
                $section: insertedSectionID,
                $name: dishName,
                $vegetarian: vegetarian,
                $vegan: vegan
              });

              /*
              var insertedDishId;
              db.get('SELECT id FROM dishes WHERE section=$section AND name=$name;', {
                $section: insertedSectionID,
                $name: dishName
              }, function(err, row) {
                if (!err) {
                  // sometimes the row is undefined - not sure why - this
                  // gets around that - later there will be a check to see if
                  // insertedDishId is undefined - if so, it will make another
                  // db query to get it
                  if (row != undefined) {
                    insertedDishId = row['id'];
                  } else {
                    insertedDishId = undefined;
                    db.get('SELECT id FROM dishes WHERE section=$section AND name=$name;', {
                      $section: insertedSectionID,
                      $name: dishName
                    }, function(err, row) {
                      if (!err) {
                        insertedDishId = row['id'];
                      }
                    });
                  }

                  // get the nutrition facts data
                  request(dishNutritionURL, function(error, response, html) {
                    if (!error) {
                      var nutrition$ = cheerio.load(html);
                      var nutritionFacts = nutrition$('#WebPartManager1_wpMenuItemDetails .nutritional-data')
                        .find('tr');

                      var data = {};

                      // get all the nutrition facts
                      for (var i = 0; i < nutritionFacts.length; i++) {
                        var theThing;
                        var theValue;
                        switch (i) {
                          case 0:
                            theThing = nutrition$(nutritionFacts[i]).children().first().html();
                            theValue = "";
                          case 1:
                            var data = nutrition$(nutritionFacts[i]).children().first().html()
                              .split("&#xA0;");
                            theThing = data[0];
                            theValue = data[1];
                            break;
                          default:
                            theThing = nutrition$(nutritionFacts[i]).children().first().html();
                            theValue = nutrition$(nutrition$(nutritionFacts[i]).children()[1])
                              .html().replace("&#xA0;", "") +
                              nutrition$(nutrition$(nutritionFacts[i]).children()[2]).html();
                            if (theValue.indexOf("\r") > -1) {
                              theValue = '';
                            }
                            break;
                        }
                        data[theThing] = theValue;
                      }
                      // now add the data to the database
                      db.run("INSERT INTO nutritionFacts (dishId, calories, totalFat, saturatedFat, transFat, cholestrol, sodium, totalCarbs, fiber, sugars, protein, vitaminA, vitaminC, calcium, iron) VALUES ($dishId, $calories, $totalFat, $saturatedFat, $transFat, $cholestrol, $sodium, $totalCarbs, $fiber, $sugars, $protein, $vitaminA, $vitaminC, $calcium, $iron)", {
                        $dishId: insertedDishId,
                        $calories: data['Calories'],
                        $totalFat: data['Total Fat'],
                        $saturatedFat: data['Saturated Fat'],
                        $transFat: data['Trans Fat'],
                        $cholestrol: data['Colestrol'],
                        $sodium: data['Sodium'],
                        $totalCarbs: data['Total Carbohydrate'],
                        $fiber: data['Dietary Fiber'],
                        $sugars: data['Sugars'],
                        $protein: data['Protein'],
                        $vitaminA: data['Vitamin A'],
                        $vitaminC: data['Vitamin C'],
                        $calcium: data['Calcium'],
                        $iron: data['Iron']
                      }, function(err) {

                        // bad thing happened whoops
                        if(err != null) {
                          console.log(err);
                        }
                      });
                    }
                  });


                } else {
                  console.log("whoops there was error");
                }

              });

              */
            }
          } else {
            console.log(err);
          }
        });




      })
    }
  });
}

// scrape breakfast

db.parallelize(function() {
  request(urlBreakfast, function(error, response, html) {
    console.log("trying to scrape breakfast!");
    if (!error) {
      console.log("scraped breakfast!");
      parseLoadedData(html, 'breakfast');
    }
  });

  request(urlLunch, function(error, response, html) {
    console.log("trying to scrape lunch!");
    if (!error) {
      console.log("scraped lunch!");
      parseLoadedData(html, 'lunch');
    }
  });

  request(urlDinner, function(error, response, html) {
    console.log("trying to scrape dinner!");
    if (!error) {
      console.log("scraped dinner!");
      parseLoadedData(html, 'dinner');
    }
  });
});
