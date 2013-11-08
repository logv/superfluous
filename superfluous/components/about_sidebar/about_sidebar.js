"use strict";

module.exports = {
  tagName: "div",
  className: "",
  defaults: {
    content: ""
  },
  client: function(options) {
    this.$el.find(".toc").empty();

    // For now, let's just wrap content div
    var $el = $(options.client_options.div);
    var headers = $el.find("h1, h2, h3, h4");
    var contents = $("<ul />");
    contents.addClass("nav");
    contents.addClass("nav-stacked");

    // http://stackoverflow.com/questions/2905867/how-to-scroll-to-specific-item-using-jquery
    function focusElement(scrollTo) {
      var container = $("body");

      container.animate({
        scrollTop: scrollTo.offset().top - container.offset().top
      });
    }

    _.each(headers, function(heading) {
      var hId = _.uniqueId("heading");
      var tagName = heading.tagName;
      var indent = tagName[1];
      var div = $("<li />");
      var weight = 'normal';
      if (indent <= 1) {
        weight = 'bold';
      }
      div.append(
        $("<a />")
          .attr('href', '#' + hId)
          .css('margin-left', indent * 5)
          .css('padding-left', "5px")
          .css('font-weight', weight)
          .css('border-left', "1px gray dotted")
          .html($(heading).html()));

      contents.append(div);

      // One way of doing it.
      div.on('click', function(e) {
        focusElement($(heading));
        e.preventDefault();
      });

      $(heading).append($("<a />").attr("id", hId).attr('href', '#'));

    });

    this.$el.append(contents);
  },
  render: function() {
    this.$el.find(".toc").empty();
    this.$el.find(".toc").append("Generating contents...");

  }
};
