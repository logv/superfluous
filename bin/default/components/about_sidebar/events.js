"use strict";

// http://stackoverflow.com/questions/2905867/how-to-scroll-to-specific-item-using-jquery
function focusElement(scrollTo) {
  var container = $("body,html");

  container.stop(true, true).animate({
    scrollTop: scrollTo.offset().top - container.offset().top
  });
}

module.exports = { 
  events: {
    "click .content-link" : "handle_focus_heading",
  },
  handle_focus_heading: function(el) {
    var hash = el.target.hash;
    var el = $(hash);
    focusElement(el);
  }
};
