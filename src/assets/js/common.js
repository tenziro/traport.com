// * init script
const traport = {
  motionText: function () {
    const visualTitle = $('#visual .title');
    setTimeout(function () {
      visualTitle.addClass('animate-start');
    }, 1500);
  },
  motionBg: function () {
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
  },
  motionImage: function () {
    let isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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
    function handleScaleClass() {
      if (!isMobileDevice && $(window).width() > 768) {
        $backgroundItems.eq(currentIndex).addClass('scale');
      } else {
        $backgroundItems.eq(currentIndex).removeClass('scale');
      }
    }
    function showNextBackground() {
      $backgroundItems.stop().fadeTo(1200, 0, function () {
        let targetBg = $(this);
        setTimeout(function () {
          targetBg.removeClass('scale');
        }, 1000);
      });

      currentIndex = getRandomIndex(currentIndex, backgrounds.length);
      $backgroundItems.eq(currentIndex).stop().fadeTo(1200, 1, function () {
        if (!isMobileDevice && $(window).width() > 768) {
          $(this).addClass('scale');
        }
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
    $(window).on('resize', function () {
      handleScaleClass();
    });
    handleScaleClass();
    showNextBackground();
  },
  toggleDarkMode: function () {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDarkMode) {
      $('.header-logo, #mo-header').removeClass('dark');
    }
  },
  updatePcNav: function () {
    const headerNav = $("#header .nav-item a");
    headerNav.click(function (event) {
      event.preventDefault();
      var target = $($(this).attr("href"));
      $("html, body").animate({
        scrollTop: target.offset().top
      }, 800);
    });

    function updateActiveNavItem() {
      var scrollPos = $(document).scrollTop();
      var windowHeight = $(window).height();

      headerNav.each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        var elementTop = refElement.offset().top;
        var elementBottom = elementTop + refElement.outerHeight();

        if (elementTop <= scrollPos && elementBottom > scrollPos) {
          headerNav.removeClass("focus");
          currLink.addClass("focus");
          return false;
        } else {
          currLink.removeClass("focus");
        }
      });
    }
    function checkScrollEnd() {
      var documentHeight = $(document).height();
      var windowHeight = $(window).height();
      var scrollPos = $(window).scrollTop();
      if (documentHeight - windowHeight === scrollPos) {
        headerNav.removeClass("focus");
      }
    }
    $(document).on("scroll", updateActiveNavItem);
    $(document).on("scroll", checkScrollEnd);
    $(window).on('resize', function () {
      traport.updatePcNav();
    });
  },
  updateMoNav: function () {
    $("#mo-header .nav-item a").click(function (event) {
      event.preventDefault();
      const target = $($(this).attr("href"));
      $("html, body").animate({
        scrollTop: target.offset().top
      }, 300);
      $('#mo-header').removeClass('is-click');
      $('.btn-mo-menu, .lang-change.mo').removeClass('is-active');
    });
    $('.btn-mo-menu').on('click', function () {
      $(this).stop().toggleClass('is-active')
      $('#mo-header').stop().toggleClass('is-click');
      if ($(this).hasClass('is-active')) {
        $('body').addClass('overflow-hidden');
        $('.lang-change.mo').addClass('is-active');
      } else {
        $('body').removeClass('overflow-hidden');
        $('.lang-change.mo').removeClass('is-active');
      }
    });
  },
  mobileResize: function () {
    function isMobile() {
      return $(window).width() <= 768;
    }

    let isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    let isMobileWidth = isMobile();

    if (isMobileDevice || isMobileWidth) {
      // $('.btn-mo-menu').removeClass('is-active');
      $('#header').removeClass('is-active');
      $('#mo-header').addClass('is-active');
      // $('#mo-header').addClass('is-active').removeClass('is-click');
      $('.lang-change').removeClass('pc').addClass('mo');
      $('.header-logo').removeClass('pc').addClass('mo');
    } else {
      $('#header').addClass('is-active');
      // $('#mo-header').removeClass('is-active');
      $('#mo-header').removeClass('is-active');
      $('.lang-change').removeClass('mo').addClass('pc');
      $('.header-logo').removeClass('mo').addClass('pc');
    }
    $(window).on('resize', function () {
      traport.mobileResize();
    });
  },
  recruitModal: function () {
    const modal = $('.modal');
    const modalContents = $('.modal-contents');
    const btnRecruit = $('.btn-recruit-apply');
    const btnModalClose = $('.modal .btn-modal-close');

    btnRecruit.on('click', function () {
      modal.addClass('is-active');
      $('body').addClass('overflow-hidden');
    });
    btnModalClose.on('click', function () {
      modal.removeClass('is-active');
      $('body').removeClass('overflow-hidden');
    });
  }
}

// * ready...
$(document).ready(function () {
  traport.motionText();
  traport.motionBg();
  traport.motionImage();
  traport.toggleDarkMode();
  traport.updatePcNav();
  traport.mobileResize();
  traport.recruitModal();

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    traport.toggleDarkMode();
  });

  // * AOS 설정
  AOS.init({
    once: true,
    duration: 1000,
  });
});
