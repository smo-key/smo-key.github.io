$(document).ready(function () {
  firstLoad();
  updateResize();
  updateScroll();
  smoothscroll();

  $(window).resize(function() {
    updateResize();
  });
  
  $(window).scroll(function() {
    updateScroll();
  });
  
});

function firstLoad()
{
  $("#copyright").text('Copyright © ' + new Date().getFullYear().toString() + ' Arthur Pachachura');
}

function updateResize() {
  var $cW = $(window).width();
  var $cH = $(window).height();
}

function smoothscroll() {
  $('a[href*=#]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
    && location.hostname == this.hostname) {
      var $target = $(this.hash);
      $target = $target.length && $target
      || $('[name=' + this.hash.slice(1) +']');
      if ($target.length) {
        var targetOffset = $target.offset().top;
        $('html,body')
        .animate({scrollTop: targetOffset}, 500);
       return false;
      }
    }
  });
}

function updateScroll() {
  var s = $(document).scrollTop();
  $(".header").css("background-color","rgba(242, 242, 242, " + (coerce(s - 50,0,70)/100).toString() + ")");
  $("#img01").css("-webkit-filter","blur(" + (coerce((s - 40)*7.5,0,750)/100).toString() + "px) contrast(" + (coerce((s - 40)*-0.5 + 100,50,100)/100).toString() + ")");
  if (s > $("#profile").innerHeight()) { $("#headeravatar").addClass("headeravataractive");$("#headeravatartext").addClass("headeravataractive"); }
  else { $("#headeravatar").removeClass("headeravataractive");$("#headeravatartext").removeClass("headeravataractive");}
}

function coerce(int, min, max) {
  if (int > max) { return max; }
  if (int < min) { return min; }
  return int;
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

