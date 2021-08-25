var request = require('../../node_modules/request');
const getimage = (start, end, polyid, callback) => {
  var options = {
    'method': 'GET',
    'url': 'http://api.agromonitoring.com/agro/1.0/image/search?start=' + start + '&end=' + end + '&polyid=' + polyid + '&appid=fa22c15b2ec8bc88d3655480ab5ee305&resolution_min=1000px&resolution_max=3000px&coverage_max=100&coverage_min=80',
    'headers': {
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    //console.log(response.body);
    var data = JSON.parse(response.body.toString());
    var satellite = data[0];
    return callback(satellite);
  });
}

const getweather = (lat, lon, callback) => {
  var options = {
    'method': 'GET',
    'url': 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=6af62b6820f3d797f057348fdad9eaa1',
    'headers': {
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    var data = JSON.parse(response.body.toString());
    return callback(data);
  });
}

const getpoly = (coordinates, callback) => {
  var options = {
    'method': 'POST',
    'url': 'https://api.agromonitoring.com/agro/1.0/polygons?appid=fa22c15b2ec8bc88d3655480ab5ee305',
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": "Farm Polygon",
      "geo_json": {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            coordinates
          ]
        }
      }
    })

  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    return callback(JSON.parse(response.body.toString()));
  });
}

const getFarmWeather = (coordinates, lat, lon, callback) => {
  var poly = null;
  getpoly(coordinates, function (data) {
    poly = data;
    var start = "1581811200";//poly.created_at
    var end = Math.floor(Date.now() / 1000);
    getimage(start, end, poly.id, function (data) {
      var satellite = data;
      //console.log(satellite.image);
      getweather(lat, lon, function (data) {
        var forcast = data;
        var weth = JSON.stringify(data.weather);
        var w = weth.substr(1, weth.length);
        var j = JSON.parse(w.substr(0, w.length - 1))
        console.log(j.main)
        return callback(
          {
            polygon: poly.id,
            truecolor: satellite.image.truecolor,
            falsecolor: satellite.image.falsecolor,
            ndvi: satellite.image.ndvi,
            evi: satellite.image.evi,
            evi2: satellite.image.evi2,
            weather: j.main,
            condition: j.description,
            icon: j.icon,
            humidity: forcast.main.humidity
          }
        );
      });
    })
  });
}

module.exports.getFarmWeather = getFarmWeather;
module.exports.getweather = getweather;