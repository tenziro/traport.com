// * visual script
const eventVisual = {
  init: function () {
    const visualTitle = $('#visual .title');
    setTimeout(function () {
      visualTitle.addClass('animate-start');
    }, 1500);
  },
  motion: function () {
    const maxDarkness = 0.95;
    const minDarkness = 0.45;
    const visualHeight = $("#visual").outerHeight();
    const visualHeight2 = $("#visual").outerHeight() - 28;

    $(window).scroll(function () {
      const currentScroll = $(this).scrollTop();

      if (currentScroll <= visualHeight) {
        const darkness = (currentScroll / visualHeight) * (maxDarkness - minDarkness) + minDarkness;
        $('#visual .dim').css('background-color', `rgba(0, 0, 0, ${darkness})`);
      } else {
        $('#visual .dim').css('background-color', `rgba(0, 0, 0, ${maxDarkness})`);
      }

      if (currentScroll >= visualHeight2) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
          $(".lang-change, .btn-mo-menu, #mo-header, .header-logo").addClass("dark");
        }
      } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
          $(".lang-change, .btn-mo-menu, #mo-header, .header-logo").removeClass("dark");
        }
      }
    });
  }
}

// * mobile script
function isMobile() {
  return $(window).width() <= 768;
}
let isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
let isMobileWidth = isMobile();

// * ready...
$(document).ready(function () {
  eventVisual.init();
  eventVisual.motion();

  // * AOS 설정
  AOS.init({
    once: true,
    duration: 1000,
  });

  // * nav setting
  $("#header .nav-item a").click(function (event) {
    event.preventDefault();
    const target = $($(this).attr("href"));
    $("html, body").animate({
      scrollTop: target.offset().top
    }, 300);
  });
  function updateActiveNavItem() {
    const scrollPos = $(document).scrollTop();
    $("#header .nav-item a").each(function () {
      const currLink = $(this);
      const refElement = $(currLink.attr("href"));
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $("#header .nav-item a").removeClass("focus");
        currLink.addClass("focus");
      } else {
        currLink.removeClass("focus");
      }
    });
  }
  function checkFooterVisibility() {
    const footer = $("#footer");
    if (isScrolledIntoView(footer)) {
      $("#header .nav-item a").removeClass("focus");
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

  // * background
  const backgrounds = [
    '../assets/images/img/bg-visual1.jpg',
    '../assets/images/img/bg-visual2.jpg',
    '../assets/images/img/bg-visual3.jpg',
    '../assets/images/img/bg-visual4.jpg',
    '../assets/images/img/bg-visual5.jpg',
    '../assets/images/img/bg-visual6.jpg'
  ];
  const $backgroundItems = $('.visual-item');
  let currentIndex = 0;
  for (let i = 0; i < backgrounds.length; i++) {
    $backgroundItems.eq(i).css('background-image', `url(${backgrounds[i]})`);
  }
  function showNextBackground() {
    $backgroundItems.stop().fadeTo(1200, 0, function () {
      let targetBg = $(this);
      setTimeout(function () {
        targetBg.removeClass('scale');
      }, 1000)
    });
    currentIndex = getRandomIndex(currentIndex, backgrounds.length);
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

  // * mobile script
  // $("#mo-header .nav-item a").click(function (event) {
  //   event.preventDefault();
  //   const target = $($(this).attr("href"));
  //   $("html, body").animate({
  //     scrollTop: target.offset().top
  //   }, 300);
  //   $('#mo-header').removeClass('is-click');
  //   $('.btn-mo-menu, .lang-change.mo').removeClass('is-active');
  // });
  // $('.btn-mo-menu').on('click', function () {
  //   $(this).stop().toggleClass('is-active')
  //   $('#mo-header').stop().toggleClass('is-click');
  //   if ($(this).hasClass('is-active')) {
  //     $('body').addClass('overflow-hidden');
  //     $('.lang-change.mo').addClass('is-active');
  //   } else {
  //     $('body').removeClass('overflow-hidden');
  //     $('.lang-change.mo').removeClass('is-active');
  //   }
  // });
  if (isMobileDevice || isMobileWidth) {
    // $('.btn-mo-menu').removeClass('is-active');
    $('#header').removeClass('is-active');
    // $('#mo-header').addClass('is-active').removeClass('is-click');
    $('.lang-change').removeClass('pc').addClass('mo');
    $('.header-logo').removeClass('pc').addClass('mo');
  } else {
    $('#header').addClass('is-active');
    // $('#mo-header').removeClass('is-active');
    $('.lang-change').removeClass('mo').addClass('pc');
    $('.header-logo').removeClass('mo').addClass('pc');
  }
});

// * resize...
$(window).on('resize', function () {
  isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  isMobileWidth = isMobile();
  if (isMobileDevice || isMobileWidth) {
    // $('#mo-header').addClass('is-active').removeClass('is-click');
    // $('.btn-mo-menu').removeClass('is-active');
    $('#header').removeClass('is-active');
    $('.lang-change').removeClass('pc').addClass('mo');
    $('.header-logo').removeClass('pc').addClass('mo');
  } else {
    $('#header').addClass('is-active');
    // $('#mo-header').removeClass('is-active');
    $('.lang-change').removeClass('mo').addClass('pc');
    $('.header-logo').removeClass('mo').addClass('pc');
  }
});
