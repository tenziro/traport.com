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
    this.AOS();
    this.smoothScroll();
  },
  motionBg: function () {
    const maxDarkness = 0.95;
    const minDarkness = 0.45;
    const visualHeight = document.getElementById("visual").offsetHeight;
    const bgDim = document.querySelector("#visual .dim");
    const bgList = document.querySelector("#visual .visual-list");
    window.addEventListener("scroll", function () {
      const currentScroll = window.pageYOffset;
      if (currentScroll <= visualHeight) {
        const darkness = (currentScroll / visualHeight) * (maxDarkness - minDarkness) + minDarkness;
        bgDim.style.backgroundColor = `rgba(0, 0, 0, ${darkness})`;
      } else {
        bgDim.style.backgroundColor = `rgba(0, 0, 0, ${maxDarkness})`;
      }
      if (currentScroll >= visualHeight) {
        bgDim.style.position = "absolute";
        bgList.style.position = "absolute";
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
          document.querySelector("#header").classList.add("dark");
          document.querySelector("#mo-header").classList.add("dark");
          document.querySelectorAll(".lang-change, .btn-mo-menu, .header-logo").forEach(function (element) {
            element.classList.add("dark");
          });
        }
      } else {
        bgDim.style.position = "fixed";
        bgList.style.position = "fixed";
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
          document.querySelector("#header").classList.remove("dark");
          document.querySelector("#mo-header").classList.remove("dark");
          document.querySelectorAll(".lang-change, .btn-mo-menu, .header-logo").forEach(function (element) {
            element.classList.remove("dark");
          });
        }
      }
    });
  },
  motionImage: function () {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const backgrounds = [
      '../assets/images/img/bg-visual1.jpg',
      '../assets/images/img/bg-visual2.jpg',
      '../assets/images/img/bg-visual3.jpg',
      '../assets/images/img/bg-visual4.jpg',
      '../assets/images/img/bg-visual5.jpg',
      '../assets/images/img/bg-visual6.jpg'
    ];
    const backgroundItems = document.querySelectorAll('.visual-item');
    let currentIndex = 0;
    for (let i = 0; i < backgrounds.length; i++) {
      backgroundItems[i].style.backgroundImage = `url(${backgrounds[i]})`;
    }
    function handleScaleClass() {
      if (!isMobileDevice && window.innerWidth > 768) {
        backgroundItems[currentIndex].classList.add('scale');
      } else {
        backgroundItems[currentIndex].classList.remove('scale');
      }
    }
    function showNextBackground() {
      Array.from(backgroundItems).forEach(function (item) {
        item.style.opacity = 0;
        item.classList.remove('scale');
      });
      currentIndex = getRandomIndex(currentIndex, backgrounds.length);
      backgroundItems[currentIndex].style.opacity = 1;
      if (!isMobileDevice && window.innerWidth > 768) {
        backgroundItems[currentIndex].classList.add('scale');
      }
      setTimeout(showNextBackground, 10000);
    }
    function getRandomIndex(currentIndex, maxIndex) {
      let randomIndex = currentIndex;
      while (randomIndex === currentIndex) {
        randomIndex = Math.floor(Math.random() * maxIndex);
      }
      return randomIndex;
    }
    window.addEventListener('resize', function () {
      handleScaleClass();
    });
    handleScaleClass();
    showNextBackground();
  },
  toggleDarkMode: function () {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const header = document.getElementById("header");
    const moHeader = document.getElementById("mo-header");
    const headerLogo = document.querySelectorAll(".header-logo");
    const langChange = document.querySelectorAll(".lang-change");
    if (isDarkMode) {
      header.classList.remove("dark");
      moHeader.classList.remove("dark");
      headerLogo.forEach(function (item) {
        item.classList.remove("dark");
      });
      langChange.forEach(function (item) {
        item.classList.remove("dark");
      });
    }
  },
  toggleLightMode: function () {
    const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches;
    const header = document.getElementById("header");
    const moHeader = document.getElementById("mo-header");
    const headerLogo = document.querySelectorAll(".header-logo");
    const langChange = document.querySelectorAll(".lang-change");
    if (isLightMode) {
      header.classList.add("dark");
      moHeader.classList.add("dark");
      headerLogo.forEach(function (item) {
        item.classList.add("dark");
      });
      langChange.forEach(function (item) {
        item.classList.add("dark");
      });
    }
  },
  updatePcNav: function () {
    const headerNav = document.querySelectorAll("#header .nav-item a");
    function smoothScroll(event) {
      event.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      window.scrollTo({
        top: target.offsetTop + 1,
        behavior: "smooth"
      });
    }
    function updateActiveNavItem() {
      const scrollPos = window.scrollY;
      headerNav.forEach(function (link) {
        const currLink = link;
        const refElement = document.querySelector(currLink.getAttribute("href"));
        const elementTop = refElement.offsetTop;
        const elementBottom = elementTop + refElement.offsetHeight;
        if (elementTop <= scrollPos && elementBottom > scrollPos) {
          headerNav.forEach(function (item) {
            item.classList.remove("focus");
          });
          currLink.classList.add("focus");
          return false;
        } else {
          currLink.classList.remove("focus");
        }
      });
    }
    function checkScrollEnd() {
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPos = window.pageYOffset;
      if (documentHeight - windowHeight <= scrollPos) {
        headerNav.forEach(function (item) {
          item.classList.remove("focus");
        });
      }
    }
    headerNav.forEach(function (link) {
      link.addEventListener("click", smoothScroll);
    });
    document.addEventListener("scroll", updateActiveNavItem);
    document.addEventListener("scroll", checkScrollEnd);
    window.addEventListener("resize", function () {
      traport.updatePcNav();
    });
  },
  updateMoNav: function () {
    const moHeaderNav = document.querySelectorAll("#mo-header .nav-item a");
    const btnMoMenu = document.querySelector(".btn-mo-menu");
    const moHeader = document.getElementById("mo-header");
    const langChangeMo = document.querySelector(".lang-change.mo");
    function smoothScroll(event) {
      event.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth"
      });
      moHeader.classList.remove("is-click");
      btnMoMenu.classList.remove("is-active");
      langChangeMo.classList.remove("is-active");
      document.body.classList.remove("overflow-hidden");
    }
    function toggleMoMenu() {
      this.classList.toggle("is-active");
      moHeader.classList.toggle("is-click");
      langChangeMo.classList.toggle("is-active");
      document.body.classList.toggle("overflow-hidden");
    }
    moHeaderNav.forEach(function (link) {
      link.addEventListener("click", smoothScroll);
    });
    btnMoMenu.addEventListener("click", toggleMoMenu);
  },
  mobileResize: function () {
    function isMobile() {
      return window.innerWidth <= 768;
    }
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isMobileWidth = isMobile();
    if (isMobileDevice || isMobileWidth) {
      // document.querySelector('.btn-mo-menu').classList.remove('is-active');
      document.getElementById('header').classList.remove('is-active');
      document.getElementById('mo-header').classList.add('is-active');
      // document.getElementById('mo-header').classList.add('is-active').classList.remove('is-click');
      document.querySelectorAll('.lang-change').forEach(function (item) {
        item.classList.remove('pc');
        item.classList.add('mo');
      });
      document.querySelectorAll('.header-logo').forEach(function (item) {
        item.classList.remove('pc');
        item.classList.add('mo');
      });
    } else {
      document.getElementById('header').classList.add('is-active');
      // document.getElementById('mo-header').classList.remove('is-active');
      document.getElementById('mo-header').classList.remove('is-active');
      document.querySelectorAll('.lang-change').forEach(function (item) {
        item.classList.remove('mo');
        item.classList.add('pc');
      });
      document.querySelectorAll('.header-logo').forEach(function (item) {
        item.classList.remove('mo');
        item.classList.add('pc');
      });
    }
    window.addEventListener('resize', function () {
      traport.mobileResize();
    });
  },
  recruitModal: function () {
    const modal = document.querySelector('.modal');
    const btnPrivacy = document.querySelector('.recruit-agree .control-input');
    const privacyDetail = document.querySelector('.privacy-detail');
    const btnRecruit = document.querySelector('.btn-recruit-apply');
    const btnModalClose = document.querySelector('.modal .btn-modal-close');
    const lenis = new Lenis();
    btnPrivacy.addEventListener('change', function () {
      if (this.checked) {
        privacyDetail.classList.add('is-active');
      } else {
        privacyDetail.classList.remove('is-active');
      }
    });
    btnRecruit.addEventListener('click', function () {
      modal.classList.add('is-active');
      lenis.stop();
      document.body.classList.add('overflow-hidden');
    });
    btnModalClose.addEventListener('click', function () {
      modal.classList.remove('is-active');
      lenis.start();
      privacyDetail.classList.remove('is-active');
      document.body.classList.remove('overflow-hidden');
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
    window.addEventListener('resize', function () {
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
        const loadingIndicator = document.createElement("div");
        loadingIndicator.id = "loadingIndicator";
        loadingIndicator.innerHTML = "<svg class='svg-icon' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'> <path d='M23.25 12 18 17.25l-1.058-1.058L21.127 12l-4.185-4.192L18 6.75 23.25 12Z'></path> <path d='M.75 12 6 6.75l1.058 1.058L2.872 12l4.186 4.192L6 17.25.75 12Z'></path> <path d='M13.229 4.497 9.313 19.11l1.45.389 3.915-14.612-1.45-.389Z'></path></svg>";
        document.body.appendChild(loadingIndicator);
      }
      hideLoadingIndicator() {
        const loadingIndicator = document.getElementById("loadingIndicator");
        if (loadingIndicator) {
          loadingIndicator.remove();
        }
      }
      setLanguage(language) {
        this.currentLanguage = language;
        this.updateContent();
        this.saveLanguageToLocalStorage();
      }
      loadLanguageData(callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "../assets/js/languages.json", true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            this.languageData = JSON.parse(xhr.responseText);
            if (typeof callback === "function") {
              callback();
            }
          }
        }.bind(this);
        xhr.send();
      }
      updateContent() {
        if (!this.languageData) {
          return;
        }
        window.scrollTo(0, 0);
        const data = this.languageData[this.currentLanguage];
        const localizeElements = document.querySelectorAll("[data-localize]");
        localizeElements.forEach(function (element) {
          const key = element.dataset.localize;
          if (key) {
            const localizedText = data[key];
            if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
              element.placeholder = localizedText;
            } else {
              element.innerHTML = localizedText;
            }
          }
        });
        document.documentElement.setAttribute("lang", this.currentLanguage);
        document.body.classList.remove("ko", "en");
        document.body.classList.add(this.currentLanguage);
        if (document.body.classList.contains("ko")) {
          setTimeout(function () {
            document.getElementById("visual").querySelector(".title.ko").classList.add("animate-start");
          }, 1800);
        } else {
          setTimeout(function () {
            document.getElementById("visual").querySelector(".title.en").classList.add("animate-start");
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
          document.getElementById("languageCheck").checked = true;
        }
        const languageCheck = document.getElementById("languageCheck");
        languageCheck.addEventListener("change", () => {
          const targetLanguage = languageCheck.checked ? "en" : "ko";
          this.setLanguage(targetLanguage);
          if (this.currentLanguage === "ko") {
            document.getElementById("visual").querySelector(".title.en").classList.remove("animate-start");
            setTimeout(function () {
              document.getElementById("visual").querySelector(".title.ko").classList.add("animate-start");
            }, 500);
          } else {
            document.getElementById("visual").querySelector(".title.ko").classList.remove("animate-start");
            setTimeout(function () {
              document.getElementById("visual").querySelector(".title.en").classList.add("animate-start");
            }, 500);
          }
        });
      }
    }
    const language = new Language();
  },
  mouseControl: function () {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const circle = document.querySelector(".mouse-circle");
    const clickItems = document.querySelectorAll("a, button, summary");
    if (isMobileDevice) {
      circle.style.display = "none";
    } else {
      circle.style.display = "block";
    }
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    document.addEventListener("mousemove", function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
    });
    function animateCircle() {
      const diffX = targetX - currentX;
      const diffY = targetY - currentY;
      currentX += diffX * 0.5;
      currentY += diffY * 0.5;
      circle.style.left = `${currentX}px`;
      circle.style.top = `${currentY}px`;
      requestAnimationFrame(animateCircle);
    }
    animateCircle();
    clickItems.forEach(function (item) {
      item.addEventListener("mouseenter", function () {
        circle.classList.add("circle-hover");
        circle.style.transform = "translate(-50%, -50%) scale(1.2)";
      });
      item.addEventListener("mouseleave", function () {
        circle.classList.remove("circle-hover");
        circle.style.transform = "translate(-50%, -50%)";
      });
    });
  },
  AOS: function () {
    AOS.init({
      once: true,
      duration: 1000,
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

function init() {
  traport.init();
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    traport.toggleDarkMode();
  });
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", function () {
    traport.toggleLightMode();
  });
  document.querySelector('.header-logo').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
document.addEventListener('DOMContentLoaded', init);
