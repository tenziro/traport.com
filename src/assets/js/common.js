function scrollDim() {
  var maxDarkness = 0.9;
  var minDarkness = 0.6;
  var maxScroll = $("#visual").height();

  $(window).scroll(function () {
    var currentScroll = $(this).scrollTop();

    if (currentScroll <= maxScroll) {
      var darkness = (currentScroll / maxScroll) * (maxDarkness - minDarkness) + minDarkness;
      $('#visual .dim').css('background-color', 'rgba(0, 0, 0, ' + darkness + ')');
    } else {
      $('#visual .dim').css('background-color', 'rgba(0, 0, 0, ' + maxDarkness + ')');
    }
  });
}

var eventVisual = {
  init: function () {
    var visualTitle = $('#visual .title');
    setTimeout(function () {
      visualTitle.addClass('animate-start');
    }, 1500)
  }
}

$(document).ready(function () {
  AOS.init({
    once: false,
    duration: 900,
  });

  eventVisual.init();

  $(".nav-item a").click(function (event) {
    event.preventDefault();
    var target = $($(this).attr("href"));
    $("html, body").animate({
      scrollTop: target.offset().top
    }, 300);
  });

  function updateActiveNavItem() {
    var scrollPos = $(document).scrollTop();
    $(".nav-item a").each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $(".nav-item a").removeClass("focus");
        currLink.addClass("focus");
      } else {
        currLink.removeClass("focus");
      }
    });
  }
  function checkFooterVisibility() {
    var footer = $("#footer");
    if (isScrolledIntoView(footer)) {
      $(".nav-item a").removeClass("focus");
    }
  }
  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }
  $(document).on("scroll", updateActiveNavItem);
  $(document).on("scroll", checkFooterVisibility);

  scrollDim();
});

$(document).resize(function () {
  scrollDim();
});

