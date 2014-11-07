$(document).ready(function() {
  $.each($("[data-widget][data-auto-widget!=false]"), function(i, elem) {
  	$(elem)[$(elem).data("widget")]();
  });
});