"use strict";

module.exports = {
  init: function() {
    this.on("add_comment", function(data, cmp) {
      SF.socket().emit("add_comment", data, function() {
        cmp.saved();
      });
    });
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

      var text = $("<div class='alert mtl' />");
      text.append("<h4>Comment from <b>" + (comment.author || "anon") + "</b></h4>");
      var date = new Date(comment.time);
      var date_str = date.toLocaleString();


      text.append("<div><small>" + date_str + "</small></div>");
      text.append("<br />");
      text.append($("<p>").text(comment.comment));

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
