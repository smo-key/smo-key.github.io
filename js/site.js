$(document).ready(function () {
  firstLoad();
  updateContainer();
  $(window).resize(function() {
    updateContainer();
  });
});

function firstLoad()
{
  //activate tooltips
  $('[data-toggle="tooltip"]').tooltip();
}

function updateContainer() {
  var $cW = $(window).width();
  var $cH = $(window).height();
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
