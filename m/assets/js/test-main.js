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
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
      }
      previousItem();
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
function nextItem() {

  var $previousSlide = $(".main-section").eq(currentSlideNumber - 1);
  var $currentSlide = $(".main-section").eq(currentSlideNumber);
  $currentSlide.addClass('animated').css({
    'transform' : 'translateY(0%)',
    'z-index' : '5'
  })
  // $previousSlide.removeClass("up-scroll")
  $currentSlide.on('transitionend',function(e){
    // $previousSlide.addClass("down-scroll");
    $previousSlide.css({'z-index': 0})
    $(".main-section").removeClass('animated')
    if(currentSlideNumber > 0) {
      $('.header').addClass('is--blue')
    }else {
      $('.header').removeClass('is--blue')
    }
    // if(count > 1) return false;
    // section.removeClass('animated')
    // section.eq(currentIdx - 1).css('z-index','8');
    //
    // for(let i = currentIdx; i <= section.length; i++) {
    //   section.eq(i).css({
    //     'transform' : 'translateY(100%)',
    //     'z-index' : ''
    //   });
    // }
  })
}

function previousItem() {
  var $nextSlide = $(".main-section").eq(currentSlideNumber + 1);
  var $currentSlide = $(".main-section").eq(currentSlideNumber);
  // next가 아래로 가야하고, current가 위로 가야함
  console.log($nextSlide, $currentSlide)
  $currentSlide.addClass('animated').css({
    'transform' : 'translateY(0%)',
    'z-index' : '5'
  })
  // $currentSlide.removeClass("down-scroll")
  $currentSlide.on('transitionend',function(e){
    // $currentSlide.addClass("up-scroll");
    // $nextSlide.css({'z-index': 0})
    $nextSlide.addClass('animated').css({
      'transform' : 'translateY(-100%)',
      'z-index' : ''
    })
    if(currentSlideNumber > 0) {
      $('.header').addClass('is--blue')
    }else {
      $('.header').removeClass('is--blue')
    }
  })
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
