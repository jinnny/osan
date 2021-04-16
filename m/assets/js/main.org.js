// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = $(".main-section").length;

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(evt) {
  if (isFirefox) {
    //Set delta for Firefox
    delta = evt.detail * (-120);
  } else if (isIe) {
    //Set delta for IE
    delta = -evt.deltaY;
  } else {
    //Set delta for all other browsers
    delta = evt.wheelDelta;
  }

  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        //스크롤을내릴때
        downItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
      }
      upItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

// ------------- SLIDE MOTION ------------- //
function downItem() {
  var $previousSlide = $(".main-section").eq(currentSlideNumber - 1);
  var $currentSlide = $(".main-section").eq(currentSlideNumber);
  //up scroll class가 붙으면 모두 제자리에 있음 (y값 0)
  //downscroll이 붙으면 위로 이동(y값 -100vh)
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}

function upItem() {
  var $currentSlide = $(".main-section").eq(currentSlideNumber);
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
}


$(function () {

  var mainVisual = new Swiper('.main-visual-swiper-container', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    pagination: '.swiper-pagination',
    paginationType: 'fraction',
    paginationClickable: true,
    autoplay: 4000,
    autoplayDisableOnInteraction: false,
    effect: 'fade'
  });
  $('.js-swiper-controller--stop').on('click', function () {
    mainVisual.stopAutoplay()
    $(this).hide()
    $('.js-swiper-controller--play').show()
  })
  $('.js-swiper-controller--play').on('click', function () {
    mainVisual.startAutoplay()
    $(this).hide()
    $('.js-swiper-controller--stop').show()
  })

  // popup
  $('.js-popup-toggle-button').on('click', function (){
    $(this).parents('.popup').toggleClass('is--active')
    if($('.popup').hasClass('is--active')) {
      $(this).find('.popup-toggle-text').text('CLOSE')
    }else {
      $(this).find('.popup-toggle-text').text('OPEN')
    }
  });

  new Swiper('.popup-swiper-container', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    pagination: '.swiper-pagination',
    paginationType: 'fraction',
    paginationClickable: true,
    autoplayDisableOnInteraction: false
  });

  new Swiper('.premium-swiper-container', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 1.15
  });
})
