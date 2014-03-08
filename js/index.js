$(document).ready(function () {
    updateContainer();
    $(window).resize(function() {
        updateContainer();
    });
});

function updateContainer() {
    var $containerWidth = $(window).width();
    if ($containerWidth < 450) {
        $("title-div").removeClass("title-div-comp");
        $("title-name").removeClass("title-name-comp");
        $("title-items-div").css("display", "none");
    }
    if (($containerWidth < 700) && ($containerWidth >= 450)) {
        $("title-div").addClass("title-div-comp");
        $("title-items-div").addClass("title-items-div-comp");
        requestAnimFrame(updateContainer);
        var $aWidth = ($containerWidth - $("title-items-div").width())/2;
        $("title-items-div").css("right", $aWidth);
        $("title-items-div").css("display", "inherit");
        $("title-item").addClass("title-item-comp");
        $("title-name").addClass("title-name-comp");
    }
    if ($containerWidth >= 700) {
        $("title-div").removeClass("title-div-comp");
        $('title-items-div').removeClass("title-items-div-comp");
        $("title-item").removeClass("title-item-comp");
        $("title-name").removeClass("title-name-comp");
        $("title-items-div").css("display", "inherit");
        $("title-items-div").css("right","36px");
    }
    $('main').html($containerWidth.toString());
    return;
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();