$('[data-toggle="tooltip"]').tooltip();

$('.form-group .fa-search').hover(function() {
  //set search bar in focus
  $('input[type=search]').focus();
});

//window.addEventListener("popstate", function(e) {
//
//	// URL location
//	var location = document.location;
//
//	// state
//	var state = e.state;
//	
//	// return to last state
//	if (state.view == "EMAILCONTENT") {
//		...
//	}
//
//});