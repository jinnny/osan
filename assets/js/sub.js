var $bg, $title, $en, $ele;
var _init = function() {
  $ele = $('.sub-top-area');
  $bg = $ele.find('.sub-top-bg');
  $title = $ele.find('.sub-top__title');
  $en = $ele.find('.en_tit');
  $menu = $ele.find('.sub-top-menu')
  var mySplitText = new SplitText($title, { type: "chars" });
  //var word_tl = new TimelineLite({delay:1});
  var shuffleCharArray = shuffleArray(mySplitText.chars);
  var icons = $(".main-quick-menu");

  TweenLite.set(shuffleCharArray, { autoAlpha: 0 });

  tl = new TimelineLite();
  tl.staggerTo(shuffleCharArray, .8, { autoAlpha: 1, ease: Cubic.easeOut }, 0.2)
  tl.staggerFrom(icons, .8, { autoAlpha: 0, y: 100, ease: Cubic.easeOut }, 0.15)
  tl.from($bg, 2.5, { autoAlpha: 0, scale: 1.12, skewX: 0.001, ease: Power2.easeOut }, "-=2.9")
  tl.from($title, 2, { autoAlpha: 0, y: 100, ease: Power2.easeOut }, "-=1.6")
  tl.to($ele, 1.2, { height: 670, ease: Power2.easeOut }, "-=1.2")
  tl.staggerTo($menu, .8, { autoAlpha: 1, ease: Cubic.easeOut }, 0.2)
  // tl.staggerFrom($menu, .8, { autoAlpha: 0, y: 100, ease: Cubic.easeOut }, 0.15)
  tl.play();
  tl.timeScale(1.5);

  function shuffleArray (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }


  TweenMax.set($(".sub-top-copyright"), {autoAlpha:0, y:30});
  //TweenMax.set($title, {autoAlpha:0, y:30});

  var titm = new TimelineMax({pause:true});
  titm.from($ele, 2.5, {autoAlpha:.5, "backgroundPositionY":80, ease:Power2.easeOut}, "bg")
    .to($(".sub-top-copyright"), 1.5, {autoAlpha:1, y:0, ease:Power2.easeOut}, "-=2")
  titm.play();

}
$(function () {
  _init()
})
