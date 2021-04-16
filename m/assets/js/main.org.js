$(function() {
  $('.main-section-visual').addClass('play')
  $('.main-section-visual').addClass('is--active')
  // ------------- VARIABLES ------------- //
  var ticking = false;
  var isFirefox = (/Firefox/i.test(navigator.userAgent));
  var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
  var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
  var slideDurationSetting = 1500; //Amount of time for which slide is "locked"
  var currentSlideNumber = 0;
  var totalSlideNumber = $(".main-section").length + 1; // +1 푸터 스크롤 갯수 추가

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
    if (currentSlideNumber === totalSlideNumber - 1) {
      //main-section-area 에다가 show—footer 클래스추가!
      $('.main-section-area').addClass('show--footer');
      return
    }
    var $prevSlide = $(".main-section").eq(currentSlideNumber - 1);
    var $currentSlide = $(".main-section").eq(currentSlideNumber);
    zidx()
    $('.main-section').removeClass('is--active')
    $currentSlide.addClass('is--active')
    $currentSlide.addClass('animated').css({
      'transform': 'translateY(0%)'
    })
    setTimeout(function () {
      $prevSlide.removeClass('animated').css({
        'transform': 'translateY(-100%)'
      })
      if (currentSlideNumber > 0) {
        $('.header').addClass('is--blue')
        $('.main-section-visual').removeClass('play')
      } else {
        $('.header').removeClass('is--blue')
      }
    }, slideDurationSetting)

  }

  function upItem() {
    if (currentSlideNumber === totalSlideNumber - 2) {
      $('.main-section-area').removeClass('show--footer');
      return
    }
    var $currentSlide = $(".main-section").eq(currentSlideNumber);
    var $nextSlide = $(".main-section").eq(currentSlideNumber + 1);
    reversZidx()
    $('.main-section').removeClass('is--active')
    $currentSlide.addClass('is--active')
    $currentSlide.addClass('animated').css({
      'transform': 'translateY(0%)'
    })
    setTimeout(function () {
      $nextSlide.removeClass('animated').css({
        'transform': 'translateY(100%)'
      })
      if (currentSlideNumber > 0) {
        $('.header').addClass('is--blue')
        $('.main-section-visual').removeClass('play')
      } else {
        $('.header').removeClass('is--blue')
      }
    }, slideDurationSetting)
  }

  function zidx() {
    $('.main-section').each(function(idx, item) {
      $(this).css('z-index', idx)
    })
  }
  function reversZidx() {
    $('.main-section').each(function(idx, item) {
      $(this).css('z-index',totalSlideNumber - idx)
    })
  }

  //시작
  $('.main-section').each(function(idx, item) {
    if(idx !== 0) {
      $(this).css({'transform': 'translateY(100%)',})
    }
  })

})


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
    console.log('tt')
    $('.popup').toggleClass('is--active')
    if($('.popup').hasClass('is--active')) {
      $('.popup').find('.popup-toggle-text').text('CLOSE')
    }else {
      $('.popup').find('.popup-toggle-text').text('OPEN')
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
    slidesPerView: 1
  });
})
