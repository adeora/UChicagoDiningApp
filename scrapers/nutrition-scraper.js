var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

var url = "http://univofchicago.campusdish.com/Commerce/Catalog/MenuItemDetails.aspx?pid=M20013_1604&cat=HE%20Catalog%20Set%201_Location&iframe=true&custom=true&width=400&height=770";

request(url, function(error, response, html) {
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
          break;
      }
      data[theThing] = theValue;
    }

    // now add the data to the database
    console.log(data);
  }
});
