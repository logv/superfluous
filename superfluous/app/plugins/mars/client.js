"use strict";

module.exports = {
  init: function() {
    this.on("add_comment", function(data, cmp) {
      SF.socket().emit("add_comment", data, function() {
        cmp.saved();
      });
    });
  },
  events: {
    "click .resolve_comment" : "handle_resolve_comment"
  },
  handle_resolve_comment: function(evt) {
    var comment_link = $(evt.target);
    console.log("Resolving comment", comment_link.data("id"));
    SF.socket().emit("resolve_comment", { 
      _id: comment_link.data("id")
    });
    comment_link.parent(".comment").addClass("resolved");
  },
  add_comments: function(comments) {
    // Let's do this!
    var paragraph_lookup = {};

    function populate_paragraphs(n) {
      paragraph_lookup = {};
      $("p").each(function() {
        var first_words = $(this).text().substr(0, n);
        paragraph_lookup[first_words] = $(this);
      });
    }

    var size = 10;
    populate_paragraphs(size);

    while (paragraph_lookup.length !== $("p").length && size < 100) {
      size += 10;
      populate_paragraphs(size);
    }

    _.each(comments, function(comment) {
      var first_words = comment.paragraph.substr(0, size);
      var p = paragraph_lookup[first_words];

      var text = $("<div class='comment alert mtl' />");

      if (comment.resolved) {
        text.addClass("resolved");
      }
      text.append("<h4>Comment from <b>" + (comment.author || "anon") + "</b></h4>");
      var date = new Date(comment.time);
      var date_str = date.toLocaleString();


      text.append("<div><small>" + date_str + "</small></div>");
      text.append("<br />");
      text.append($("<p>").text(comment.comment));

      if (!comment.resolved) {
        var resolve_link = $("<a href='#' class='resolve_comment'>Resolve Comment</a>");
        resolve_link.data("id", comment._id);
        text.append(resolve_link);
      }



      if (p) {
        // Add this comment to the end of the paragraph
        p.append(text);
      } else {
        // Add it to the end of the document!
        $("body").append(text);
        text.prepend("<h5>(Outdated Comment)</h5>");
      }
    });
  }

};
