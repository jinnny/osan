$(function (){
  // 모바일 메뉴 버튼 열기/닫기
  $('.js-header-menu-button').on('click',function (){
    $(this).parents('.js-header').toggleClass('is--open');
  })
  $('.js-header-menu-close-button').on('click', function (){
    $(this).parents('.js-header').removeClass('is--open');
  })

  // 모바일일 경우 2차메뉴 열기
  $('.js-header-menu-item__link').on('click', function (e){
    var parentLi = $(this).parents('li')
    if (parentLi.has('ul').length > 0) {
      e.preventDefault()
      parentLi.find('ul').slideToggle()
    }
  })
})
