
// var _this = this;
// var view = $('.box_global_view');
// var viewLen = view.length;
var height = $(window).height();
// var current;
// var currentIdx;
// var pageId;
// var slideChk = false;
// var delta;
// let downChk = true
// let upChk = true

function parallaxScroll (e) {
  // $(window).on('wheel DOMMouseScroll', function (e) {
  let current = $('.main-section.active');
  let currentIdx = current.index();
  let delta
  if (e.detail === 0) {
    delta = e.wheelDelta / -120;
  } else {//파이어폭스용
    delta = e.detail / 3
  }
  const section = $('.main-section')
  const sectionLength = $('.main-section').length
  console.log(e, delta, currentIdx, sectionLength)

  // if(delta > 0 && currentIdx < sectionLength -1 && downChk) {
  // 스크롤내릴 때
  // if(delta > 0 && currentIdx < sectionLength -1) {
  if (delta > 0  && currentIdx < sectionLength -1) {
    // section.eq(currentIdx).addClass('fix')
    // section.eq(currentIdx+1).addClass('animated').css({
    //   'transform' : 'translateY(0%)',
    //   'z-index' : 10
    // });
    // section.eq(currentIdx + 1).addClass('active').siblings('.main-section').removeClass('active');
    section.eq(currentIdx).removeClass('active').addClass('pass')
    section.eq(currentIdx + 1).addClass('active')
    //
    // let count = 0
    // section.eq(currentIdx + 1).on('transitionend',function(e){
    //   count++;
    //   if(count > 1) return false;
    //
    //   section.removeClass('animated');
    //   section.eq(currentIdx).removeClass('fix')
    //   for(let i = 0; i <= currentIdx; i++) {
    //     section.eq(i).css({
    //       'transform' : 'translateY(-100%)',
    //       'z-index' : ''
    //     });
    //   }
    // })
  }
  // 스크롤올릴떄
  else if(delta < 0 && currentIdx > 0) {
    section.eq(currentIdx - 1).addClass('animated').css({
      'transform' : 'translateY(0%)',
      'z-index' : '11'
    })
    section.eq(currentIdx - 1).addClass('active').siblings('.main-section').removeClass('active');

    // if(section.eq(currentIdx - 1).find('.box_slide_item').length > 1) {
    //   slideChk = true;
    // }
    let count = 0;

    section.eq(currentIdx - 1).on('transitionend',function(e){
      count++;
      if(count > 1) return false;
      section.removeClass('animated')
      section.eq(currentIdx - 1).css('z-index','8');

      for(let i = currentIdx; i <= section.length; i++) {
        section.eq(i).css({
          'transform' : 'translateY(100%)',
          'z-index' : ''
        });
      }
    })
  }
  // });
}
const isFirefox = (/Firefox/i.test(navigator.userAgent));
const mousewheelEvent = isFirefox ? 'DOMMouseScroll' : 'wheel';
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);


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
