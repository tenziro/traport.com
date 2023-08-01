function scrollDim() {
  const maxDarkness = 0.9;
  const minDarkness = 0.6;
  const maxScroll = $("#visual").height();

  $(window).scroll(function () {
    const currentScroll = $(this).scrollTop();

    if (currentScroll <= maxScroll) {
      const darkness = (currentScroll / maxScroll) * (maxDarkness - minDarkness) + minDarkness;
      $('#visual .dim').css('background-color', `rgba(0, 0, 0, ${darkness})`);
    } else {
      $('#visual .dim').css('background-color', `rgba(0, 0, 0, ${maxDarkness})`);
    }
  });
}

const eventVisual = {
  init: function () {
    const visualTitle = $('#visual .title');
    setTimeout(function () {
      visualTitle.addClass('animate-start');
    }, 1500);
  }
}

$(document).ready(function () {
  eventVisual.init();

  // AOS 설정
  AOS.init({
    once: true,
    duration: 1000,
  });

  // nav 설정
  $(".nav-item a").click(function (event) {
    event.preventDefault();
    const target = $($(this).attr("href"));
    $("html, body").animate({
      scrollTop: target.offset().top
    }, 300);
  });

  function updateActiveNavItem() {
    const scrollPos = $(document).scrollTop();
    $(".nav-item a").each(function () {
      const currLink = $(this);
      const refElement = $(currLink.attr("href"));
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $(".nav-item a").removeClass("focus");
        currLink.addClass("focus");
      } else {
        currLink.removeClass("focus");
      }
    });
  }

  function checkFooterVisibility() {
    const footer = $("#footer");
    if (isScrolledIntoView(footer)) {
      $(".nav-item a").removeClass("focus");
    }
  }

  function isScrolledIntoView(elem) {
    const docViewTop = $(window).scrollTop();
    const docViewBottom = docViewTop + $(window).height();
    const elemTop = $(elem).offset().top;
    const elemBottom = elemTop + $(elem).height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }
  $(document).on("scroll", updateActiveNavItem);
  $(document).on("scroll", checkFooterVisibility);

  scrollDim();

  let currentIndex = 0;
  const $backgroundItems = $('.visual-item');

  function showNextBackground() {
    $backgroundItems.stop().fadeTo(1200, 0, function () {
      let targetBg = $(this);
      setTimeout(function () {
        targetBg.removeClass('scale');
      }, 1000)
    });

    currentIndex = getRandomIndex(currentIndex, 3);
    $backgroundItems.eq(currentIndex).stop().fadeTo(1200, 1, function () {
      $(this).addClass('scale');
    });

    setTimeout(showNextBackground, 10000);
  }

  function getRandomIndex(currentIndex, maxIndex) {
    let randomIndex = currentIndex;
    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * maxIndex);
    }
    return randomIndex;
  }

  showNextBackground();
});

$(document).resize(function () {
  scrollDim();
});

