"use strict";

var orm = require('orm');
var package_json = require_core("../package.json");
var app_name = package_json.name;
var mongodb = require("mongodb"),
    port = mongodb.Connection.DEFAULT_PORT;


module.exports = {
  install: function(app) {
    var self = this;
    var orm_name = "mongodb://localhost/" + app_name;
    app.use(orm.express(orm_name, {
        define: function (db, models, next) {
            models.comment = db.define("comment", {
              author: String,
              comment: String,
              paragraph: String,
              public: Boolean,
              sid: String,
              time: Number,
              index: Number,
              pageid: String,
              page: String
            });

            models.timespent = db.define("timespent", {
              controller: String,
              page: String,
              pageid: String,
              sid: String,
              data: Object
            });


            _.extend(self, models);
            next();
        }
    }));

  }
};
