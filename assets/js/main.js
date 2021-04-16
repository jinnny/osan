
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

// $(window).on('wheel DOMMouseScroll', function (event) {
//   function parallaxScroll (event) {
//     let current = $('.main-section.active');
//     let currentIdx = current.index();
//     let delta
//     if (event.detail === 0) {
//       delta = event.wheelDelta / -120;
//     } else {//파이어폭스용
//       delta = event.detail / 3
//     }
//     //
//     // if(currentIdx === 2) {
//     //   downChk = true;
//     // }
//
//     const section = $('.main-section')
//     const sectionLength = $('.main-section').length
//
//     // if(delta > 0 && currentIdx < sectionLength -1 && downChk) {
//     if(delta > 0 && currentIdx < sectionLength -1) {
//       section.eq(currentIdx).addClass('fix')
//       section.eq(currentIdx+1).addClass('animated').css({
//         'transform' : 'translateY(0%)',
//         'z-index' : 10
//       });
//       section.eq(currentIdx + 1).addClass('active').siblings('.main-section').removeClass('active');
//
//       let count = 0
//       section.eq(currentIdx + 1).on('transitionend',function(e){
//         count++;
//         if(count > 1) return false;
//
//         section.removeClass('animated');
//         section.eq(currentIdx).removeClass('fix')
//         for(let i = 0; i <= currentIdx; i++) {
//           section.eq(i).css({
//             'transform' : 'translateY(-100%)',
//             'z-index' : ''
//           });
//         }
//
//         // if(section.eq(currentIdx).find('.swiper-container-horizontal').length == 1)  {
//         //   if(currentIdx !== 0) {
//         //     _this.slide.init();
//         //   } else {
//         //     $('.wrap_view_main').find('.swiper-container-horizontal')[0].swiper.init();
//         //   }
//         // }
//         // if(slideChk) {
//         //   _this.row();
//         // }
//         //
//         // $('.brand_special_offer').scrollTop(0);
//         //
//         // _this.wheelChk = false;
//         // upChk = true;
//         // slideChk = false;
//         //
//         // if(currentIdx == 4) {
//         //   $('.wrap').addClass('black');
//         //   // _this.wheelChk = true;
//         //   _this.cardEvent();
//         // }
//       })
//       // }else if(delta < 0 && currentIdx > 0 && upChk) {
//     }else if(delta < 0 && currentIdx > 0) {
//       section.eq(currentIdx - 1).addClass('animated').css({
//         'transform' : 'translateY(0%)',
//         'z-index' : '11'
//       })
//       section.eq(currentIdx - 1).addClass('active').siblings('.main-section').removeClass('active');
//
//       // if(section.eq(currentIdx - 1).find('.box_slide_item').length > 1) {
//       //   slideChk = true;
//       // }
//       let count = 0;
//
//       section.eq(currentIdx - 1).on('transitionend',function(e){
//         count++;
//         if(count > 1) return false;
//         section.removeClass('animated')
//         section.eq(currentIdx - 1).css('z-index','8');
//
//         for(let i = currentIdx; i <= section.length; i++) {
//           section.eq(i).css({
//             'transform' : 'translateY(100%)',
//             'z-index' : ''
//           });
//         }
//         // if(section.eq(currentIdx).find('.swiper-container-horizontal').length == 1)  {
//         //   _this.slide.init();
//         // }
//         // if(slideChk) {
//         //   _this.row();
//         // }
//         //
//         // $('.brand_special_offer').scrollTop(0);
//         //
//         // _this.wheelChk = false;
//         // downChk = true;
//         // slideChk = false;
//         // console.log('asdfadf')
//       })
//     }
//   }

// });
// const isFirefox = (/Firefox/i.test(navigator.userAgent));
// const mousewheelEvent = isFirefox ? 'DOMMouseScroll' : 'wheel';
// window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

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
