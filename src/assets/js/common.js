// * init script
const traport = {
  init: function () {
    this.motionBg();
    this.motionImage();
    this.toggleDarkMode();
    this.updatePcNav();
    this.mobileResize();
    this.recruitModal();
    this.daumMap();
    this.langChange();
    this.mouseControl();
    this.smoothScroll();
  },
  motionBg: function () {
    const maxDarkness = 0.95;
    const minDarkness = 0.45;
    const visualHeight = $("#visual").outerHeight();
    const bgDim = $('#visual .dim');
    const bgList = $('#visual .visual-list');
    $(window).scroll(function () {
      const currentScroll = $(this).scrollTop();

      if (currentScroll <= visualHeight) {
        const darkness = (currentScroll / visualHeight) * (maxDarkness - minDarkness) + minDarkness;
        bgDim.css('background-color', `rgba(0, 0, 0, ${darkness})`);
      } else {
        bgDim.css('background-color', `rgba(0, 0, 0, ${maxDarkness})`);
      }

      if (currentScroll >= visualHeight) {
        bgDim.css('position', 'absolute');
        bgList.css('position', 'absolute');
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
          $("#header, #mo-header, .lang-change, .btn-mo-menu, .header-logo").addClass("dark");
        }
      } else {
        bgDim.css('position', 'fixed');
        bgList.css('position', 'fixed');
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
          $("#header, #mo-header, .lang-change, .btn-mo-menu, .header-logo").removeClass("dark");
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
      $('#header, #mo-header, .header-logo, .lang-change').removeClass('dark');
    }
  },
  toggleLightMode: function () {
    const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches;
    if (isLightMode) {
      $('#header, #mo-header, .header-logo, .lang-change').addClass('dark');
    }
  },
  updatePcNav: function () {
    const headerNav = $("#header .nav-item a");
    headerNav.click(function (event) {
      event.preventDefault();
      let target = $($(this).attr("href"));
      $("html, body").animate({
        scrollTop: target.offset().top + 1
      }, 800);
    });

    function updateActiveNavItem() {
      let scrollPos = $(document).scrollTop();
      headerNav.each(function () {
        let currLink = $(this);
        let refElement = $(currLink.attr("href"));
        let elementTop = refElement.offset().top;
        let elementBottom = elementTop + refElement.outerHeight();

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
      let documentHeight = $(document).height();
      let windowHeight = $(window).height();
      let scrollPos = $(window).scrollTop();
      if (documentHeight - windowHeight <= scrollPos) {
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
    const btnPrivacy = $('.recruit-agree .control-input');
    const privacyDetail = $('.privacy-detail');
    const btnRecruit = $('.btn-recruit-apply');
    const btnModalClose = $('.modal .btn-modal-close');
    const lenis = new Lenis();
    btnPrivacy.on('change', function () {
      if ($(this).is(':checked')) {
        privacyDetail.addClass('is-active');
      } else {
        privacyDetail.removeClass('is-active');
      }
    });
    btnRecruit.on('click', function () {
      modal.addClass('is-active');
      lenis.stop();
      $('body').addClass('overflow-hidden');
    });
    btnModalClose.on('click', function () {
      modal.removeClass('is-active');
      lenis.start();
      privacyDetail.removeClass('is-active');
      $('body').removeClass('overflow-hidden');
    });
  },
  daumMap: function () {
    var mapContainer = document.getElementById('map'),
      mapOption = {
        center: new kakao.maps.LatLng(37.57209605223843, 126.98538889757558),
        level: 3,
        draggable: false,
        mapTypeId: kakao.maps.MapTypeId.ROADMAP
      };
    var map = new kakao.maps.Map(mapContainer, mapOption);
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    var markerImageUrl = 'https://traport.tenziro.net/assets/images/icons/icon-pin.png',
      markerImageSize = new kakao.maps.Size(64, 64),
      markerImageOptions = {
        offset: new kakao.maps.Point(32, 64)
      };
    var markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerImageSize, markerImageOptions);
    var marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(37.57209605223843, 126.98538889757558),
      image: markerImage,
      map: map
    });
    kakao.maps.event.addListener(marker, 'click', function () {
      window.open('https://place.map.kakao.com/993407235');
    });
    $(window).resize(function () {
      var markerPosition = marker.getPosition();
      map.relayout();
      map.setCenter(markerPosition);
    });
  },
  langChange: function () {
    class Language {
      constructor () {
        this.currentLanguage = this.loadLanguageFromLocalStorage() || "ko";
        this.languageData = null;
        this.showLoadingIndicator();
        this.loadLanguageData(() => {
          this.hideLoadingIndicator();
          this.updateContent();
        });
        this.initLanguageToggle();
      }

      showLoadingIndicator() {
        $("body").append("<div id='loadingIndicator'><svg class='svg-icon' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'> <path d='M23.25 12 18 17.25l-1.058-1.058L21.127 12l-4.185-4.192L18 6.75 23.25 12Z'></path> <path d='M.75 12 6 6.75l1.058 1.058L2.872 12l4.186 4.192L6 17.25.75 12Z'></path> <path d='M13.229 4.497 9.313 19.11l1.45.389 3.915-14.612-1.45-.389Z'></path></svg></div>");
      }

      hideLoadingIndicator() {
        $("#loadingIndicator").remove();
      }

      setLanguage(language) {
        this.currentLanguage = language;
        this.updateContent();
        this.saveLanguageToLocalStorage();
      }
      loadLanguageData(callback) {
        $.getJSON('../assets/js/languages.json', (data) => {
          this.languageData = data;
          if (typeof callback === "function") {
            callback();
          }
        });
      }
      updateContent() {
        if (!this.languageData) {
          return;
        }
        $(window).scrollTop(0);
        const data = this.languageData[this.currentLanguage];
        $("[data-localize]").each(function () {
          const key = $(this).data("localize");
          if (key) {
            const localizedText = data[key];
            if ($(this).is("input, textarea")) {
              $(this).attr("placeholder", localizedText);
            } else {
              $(this).html(localizedText);
            }
          }
        });
        $("html").attr("lang", this.currentLanguage);
        $("body").removeClass("ko en").addClass(this.currentLanguage);
        if ($('body').hasClass('ko')) {
          setTimeout(function () {
            $('#visual .title.ko').addClass('animate-start');
          }, 1800);
        } else {
          setTimeout(function () {
            $('#visual .title.en').addClass('animate-start');
          }, 1800);
        }
      }
      saveLanguageToLocalStorage() {
        localStorage.setItem("selectedLanguage", this.currentLanguage);
      }
      loadLanguageFromLocalStorage() {
        return localStorage.getItem("selectedLanguage");
      }

      initLanguageToggle() {
        const savedLanguage = this.loadLanguageFromLocalStorage();
        if (savedLanguage === "en") {
          $("#languageCheck").prop("checked", true);
        }

        // Language toggle event handler
        $("#languageCheck").on("change", () => {
          const targetLanguage = $("#languageCheck").prop("checked") ? "en" : "ko";
          this.setLanguage(targetLanguage);
          if (this.currentLanguage === 'ko') {
            $("#visual .title.en").removeClass("animate-start");
            setTimeout(function () {
              $('#visual .title.ko').addClass("animate-start");
            }, 500);
          } else {
            $("#visual .title.ko").removeClass("animate-start");
            setTimeout(function () {
              $('#visual .title.en').addClass("animate-start");
            }, 500);
          }
        });
      }
    }
    const language = new Language();
  },
  mouseControl: function () {
    let isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const circle = $('.mouse-circle');
    const clickItem = $('a, button, summary');

    if (isMobileDevice) {
      circle.hide();
    } else {
      circle.show();
    }

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    $(document).on('mousemove', function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    function animateCircle() {
      const diffX = targetX - currentX;
      const diffY = targetY - currentY;
      currentX += diffX * 0.5;
      currentY += diffY * 0.5;
      circle.css('left', `${currentX}px`);
      circle.css('top', `${currentY}px`);
      requestAnimationFrame(animateCircle);
    }
    animateCircle();
    clickItem.on('mouseenter', function () {
      circle.addClass('circle-hover').css('transform', 'translate(-50%, -50%) scale(1.2)');
    });
    clickItem.on('mouseleave', function () {
      circle.removeClass('circle-hover').css('transform', 'translate(-50%, -50%)');
    });
  },
  smoothScroll: function () {
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }
}

// * ready...
$(document).ready(function () {
  traport.init();
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    traport.toggleDarkMode();
  });
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", function () {
    traport.toggleLightMode();
  });

  // * AOS 설정
  AOS.init({
    once: true,
    duration: 1000,
  });

  $('.header-logo').on('click', function (e) {
    e.preventDefault();
    $(window).scrollTop(0);
  });
});
