var $bg, $title, $en, $ele;
var _init = function() {
  $ele = $('.sub-top-area');
  $bg = $ele.find(".sub-top-bg");
  $title = $ele.find(".sub-top__title");
  $en = $ele.find(".en_tit");

  var mySplitText = new SplitText($en, { type: "chars" });
  //var word_tl = new TimelineLite({delay:1});
  var shuffleCharArray = shuffleArray(mySplitText.chars);
  var icons = $("#depth2>ul>li");

  TweenLite.set(shuffleCharArray, { autoAlpha: 0 });

  tl = new TimelineLite({
    paused: true, onComplete: function () {
      ns.topPopup.init();
    }
  });
  tl.staggerTo(shuffleCharArray, .8, { autoAlpha: 1, ease: Cubic.easeOut }, 0.2)
  tl.staggerFrom(icons, .8, { autoAlpha: 0, y: 100, ease: Cubic.easeOut }, 0.15)
  tl.from($bg, 2, { autoAlpha: 0, scale: 1.12, skewX: 0.001, ease: Power2.easeOut }, "-=2.9")
  tl.from($title, .9, { autoAlpha: 0, y: 100, ease: Power2.easeOut }, "-=1.6")
  tl.to($ele, 1.2, { height: 740, ease: Power2.easeOut }, "-=1.2")
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
}
