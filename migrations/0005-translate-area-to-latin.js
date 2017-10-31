
var mongodb = require('mongodb');
var convert = require('cyrillic-to-latin');

exports.up = function (db, next) {
    var areaCollection = db.collection('area');

    areaCollection.find().toArray(function (err, areas) {
        for (var i = 0; i < areas.length; i++) {
            areas[i].city = convert(areas[i].city);
            areas[i].municipality = convert(areas[i].municipality);
            areas[i].name = convert(areas[i].name);
            areaCollection.save(areas[i]);
        }
    });
    next();
};

exports.down = function (db, next) {
    next();
};
