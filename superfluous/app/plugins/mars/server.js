'use strict';

var page = require_core("server/page");
var bridge = require_core("server/bridge");
var template = require_core("server/template");
var context = require_core("server/context");
var marked = require("marked");
var config = require_core("server/config");
var path = require("path");
var $ = require("cheerio");

var models = require("./models");
var fs = require("fs");

var BLOG_PATH = config.blog_root;

var BLOG_FILES = null;
var value_of = require_core("server/controller").value_of;

var mail = require("nodemailer").mail;


function load_blog_files(cb) {
  fs.readdir(BLOG_PATH, function(err, files) {
    if (!err) {
      BLOG_FILES = _.filter(files, function(filename) {
        var end = filename.substr(-3);
        return end === ".md";
      });
      BLOG_FILES.sort();
    }
    cb();
  });
}

function render_chapter_listing() {
    var template_str = template.render("controllers/blog.html.erb", {
      files: BLOG_FILES
    });

    page.render({ content: template_str, socket: true });
}

function error_reading_chapters() {
  page.render( { content: "Couldnt read files from blog directory, make"
  + "sure to initialize git submodules" });
}

function render_chapter(filename, comments) {
  template.add_stylesheet("blog.css");

  fs.readFile(path.join(BLOG_PATH, filename), function(err, data) {
    if (!err) {
      var rendered = marked(data.toString());
      var template_str = template.partial("blog/chapter.html.erb", {
        rendered: rendered,
        render_chapter_links: function() { return render_chapter_links(filename, comments); }
      });
      page.render({ content: template_str, socket: true });
    } else {
      page.render({ content: "Error reading file: " + filename });
    }
  });
}
function render_chapter_links(filename, comments) {
  return page.async(function(flush) {
    function render_links() {
      var index =_.indexOf(BLOG_FILES, filename);
      var links = $("<div />");

      var url_for = _.bind(context("router").build, context("router"));
      var method = "get_read";
      if (comments) { 
        method = "get_comments";
      }

      if (index > 0) {
        links
          .append($("<a class='lfloat'/>")
          .html("PREV")
          .attr("href", url_for("mars." + method, { id: BLOG_FILES[index-1]})));
      }

      if (index < BLOG_FILES.length - 1) {
        links
          .append($("<a class='rfloat'/>")
          .html("NEXT")
          .attr("href", url_for("mars." + method, { id: BLOG_FILES[index+1]})));
      } else {
        links.append($("<div class='rfloat'>END</div>"));
      }

      return links.html();
    }

    if (BLOG_FILES) {
      flush(render_links());
      return;
    }


    load_blog_files(function() {
      if (BLOG_FILES) {
        flush(render_links());
      } else {
        flush("");
      }

    });
  })();
}

module.exports = {
  routes: {
    "" : "get_index",
    "/read/:id" : "get_read",
    "/watch/:id" : "get_watch",
    "/comments/:id" : "get_comments",
    "/admin" : "get_admin"
  },
  is_package: true,

  get_index: function() {
    this.set_fullscreen(true);
    template.add_stylesheet("blog.css");

    if (BLOG_FILES) {
      render_chapter_listing();
      return;
    }

    load_blog_files(function() {
      if (BLOG_FILES) {
        render_chapter_listing();
      } else {
        error_reading_chapters();
      }
    });
  },

  get_admin: function(ctx, api) {
    var async_work = api.page.async(function(flush) { 
      var grouped_comments, comments;
      var after = _.after(2, context.wrap(function() {
        // Load all the comments from the db
        var template_str = template.partial("blog/admin.html.erb", { 
          files: BLOG_FILES,
          grouped_comments: grouped_comments,
          comments: comments
        });

        flush(template_str);
      }));

      models.comment.find({}, function(err, results) {
        comments = _.filter(_.toArray(results), function(comment) {
          return !comment.resolved;
        });
        grouped_comments = _.groupBy(comments, function(r) { return r.page; });
        after();
      });

      load_blog_files(function() {
        after();
      });
    });

    var work_str = async_work();
    page.render({ content: work_str.toString(), socket: true });
  
  },

  get_comments: function(ctx) {
    this.set_fullscreen(true);
    template.add_stylesheet("blog.css");
    var filename = ctx.req.params.id;

    models.comment.find({ 
      page: filename
    }, context.wrap(function(err, results) {
      bridge.controller("mars", "add_comments", results);
      render_chapter(filename, true);
    }));
  },

  get_watch: function(ctx) {
    template.add_stylesheet("blog.css");
    var filename = ctx.req.params.id;
    models.timespent.find({page: filename}, context.wrap(function(err, results) {
      if (!err) {
        var template_str = template.partial("blog/watch.html.erb", {
          results: results
        });
        page.render({ content: template_str, socket: true });
      } else {
        page.render({ content: "Couldn't find any results" });
      }

    }));
  },

  get_read: function(ctx) {
    this.set_fullscreen(true);
    // TODO: make sure filename is only a basepath
    // ../../../etc/passwd
    var filename = ctx.req.params.id;

    var client_options = {client_options: { page: filename, pageid: +Date.now()}};
    $C("paragraph_comment_helper", client_options).marshall();
    $C("paragraph_tracker", client_options).marshall();

    render_chapter(filename);
  },

  socket: function(socket) {
    socket.on("add_comment", function(data, cb) {

      var comment_data = {
        comment: value_of(data, "comment"),
        author: value_of(data, "author", ""),
        page: value_of(data, "page"),
        index: value_of(data, "index"),
        pageid: value_of(data, "pageid"),
        paragraph: value_of(data, "paragraph"),
        time: Date.now(),
        "public": false, // lint!
        sid: socket.sid
      };


      if (!_.isNumber(comment_data.index) || !comment_data.page) {
        console.log("Missing comment data information");
      } else {
        console.log("Adding comment", comment_data);

        models.comment.create([comment_data], function(err) { 
          cb("comment_added"); 

          if (!err && config.email_comments_to && config.email_from) {
            var author = comment_data.author || "anon";
            var text = "From: " + author + "\n\n Context: " +
              comment_data.paragraph + "\n\nText: " + comment_data.comment;
            var html_text = text.replace(/\n/g, "<br />");
            var subject = "You've received a new comment on " + comment_data.page;

            mail({
              from: config.email_from,
              
              to: config.email_comments_to.join(','), // list of receivers
              subject: subject, // plaintext body
              text: text,
              html: html_text
            });
          }


          
        });
      }
    });

    socket.on("resolve_comment", function(comment) {
      models.comment.find({ _id: comment._id}, function(err, results) {
        if (results.length) {
          var comment = results.pop();
          comment.resolved = true;
          comment.save();
        }

      });

    });

    // TODO: need to actually trust the incoming data
    socket.on("promote_comment", function(comment) {
      models.comment.find({ _id: comment._id}, function(err, results) {
        if (results.length) {
          var comment = results.pop();
          comment.public = true;
          comment.save();
        }

      });
    });

    socket.on("timespent", function(data) {
      models.timespent.find({
        sid: socket.sid, page: data.page, pageid: data.pageid
      }, 1, function(err, results) {
        if (err || !results.length) {
          // Create the first time, drop the rest
          models.timespent.create([{
            sid: socket.sid,
            data: data,
            page: data.page,
            pageid: data.pageid,
            controller: socket.controller
          }], function() { });
        } else {
          var result = results.pop();
          result.data = data;
          result.page = data.page;
          result.pageid = data.pageid;
          result.save();
        }

      });
    });
  }
};
