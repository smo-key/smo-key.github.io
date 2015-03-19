$('[data-toggle="tooltip"]').tooltip();

$('.form-group .fa-search').hover(function() {
  //set search bar in focus
  $('input[type=search]').focus();
});

$(window).load(function() {
  $('#maindiv').css('opacity', 1);
  $('.loader').css('opacity', 0);
});

//p, e, c, w
function changetab(colorclass, url, title) {
  if (!$('#navbaritems .' + colorclass).hasClass('active'))
  {
    $('#maindiv').css('opacity', 0);
    $('#maindiv').css('-webkit-transition', 'none');
    $('.loader').css('opacity', 1);
    $.ajax(url, {
      type: 'GET',
      success: function(data) {
        history.pushState({ url: url }, title + " - Arthur Pachachura");
        $('#maindiv').html(data.html);
        $('#maindiv').waitForImages(function() {
          $('#maindiv').css('opacity', 1);
          $('#maindiv').css('-webkit-transition', 'opacity 1s');
          $('.loader').css('opacity', 0);
        });
      }
    });
  }
}

$('#navbaritems .p').click(function() {
  changetab('p', '/profile', 'Profile');
});

$('#navbaritems .c').click(function() {
  changetab('c', '/contact', 'Contact');
});

window.addEventListener("popstate", function(e) {
  //URL location
  var location = document.location;

  //state
  var state = e.state;

  if (e.state)
  {
    if (state.url) {
      //return to state
      $.ajax(state.url, {
        type: 'GET',
        success: function(data) {
          $('#maindiv').html(data.html);
        }
      });
    }
  }
});
