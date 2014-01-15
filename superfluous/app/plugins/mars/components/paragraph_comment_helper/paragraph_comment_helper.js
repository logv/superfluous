"use strict";

module.exports = {
  tagName: "div",
  className: "",
  defaults: {
    content: "default content"
  },
  initialize: function(options) {
  },
  client: function(options) {
    var pageid = options.client_options.pageid;
    var page = options.client_options.page;

    var _added = {};
    var counter = $("<div class='counter'>")
      .css("position", "absolute")
      .css({
        "width" : "25px",
        "height" : "25px"
      });


    var toggler = $("<div class='comment_toggle pam' />")
        .css({
        "cursor" : "pointer",
        "background-color" : "#111",
        "line-height" : "10px",
        "text-align" : "center",
        "border" : "2px dotted white",
        "color": "#fff",
        "width" : "25px",
        "height" : "25px"
      });
    toggler.html("+");

    var paragraphs = $("p");
    var num_paragraphs = paragraphs.length;

    counter.append(toggler);

    $("p").prepend(counter);
    $("p").hover(function() {
      $(this).find(".counter").stop(true, true).fadeIn();
    }, function() {
      $(this).find(".counter").stop(true, true).fadeOut();
    });
    $("p .counter").on('click', function() {
      var p = $(this).parent("p");

      // Did we already add a comment adder here?
      var index = paragraphs.index(p);
      if (_added[index]) {
        try {
          _added[index].close();
        } catch (e) { }

        return;
      }

      _added[index] = true;
      p.find(".comment_toggle").html("-");

      $C("comment_adder", { paragraph: p.text().substr(1), index: index, page: page, pageid: pageid }, function(cmp) {
        cmp.$el.hide();
        p.append(cmp.$el);
        cmp.$el.slideDown();
        _added[index] = cmp;
        cmp.on('closed', function() {
          _added[index] = false;
          p.find(".comment_toggle").html("+");
        });
      });
    });

    var client_options = options.client_options;

  }
};
