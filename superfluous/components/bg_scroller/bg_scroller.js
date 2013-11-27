module.exports = {
  tagName: "div",
  className: "",
  defaults: {
    content: "default content"
  },
  client: function(options) {
    // Listen for window scrolling and cycle the body background image through
    // a list of background images
    var bg_images = options.bg_images || [
      'images/about/walrus.jpg',
      'images/about/graves-lighthouse--boston-tim-murray.jpg',
      'images/about/voltairse_sizeable.jpg',
      'images/about/banjobird.jpg',
      'images/about/Drawing-CuteSpiderMonkey.jpg',
      'images/about/futurebot.jpg'
    ];
    var last_bg = null;

    function set_window_background() {
      var windowY = $(window).height();
      var scrolledY = $("body").scrollTop();

      var index = parseInt((scrolledY / 1.5 / windowY), 10) % bg_images.length;

      if (index !== last_bg) {
        var bg_image = bg_images[index];

        $("body").css("background-image", "url('" + bg_image + "')");
      }

      last_bg = index;
    }

    set_window_background();
    $(window).scroll(_.throttle(set_window_background, 100));
  }
};
