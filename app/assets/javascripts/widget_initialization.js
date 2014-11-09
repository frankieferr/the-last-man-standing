$(document).ready(function() {
  $.each($("[data-widget][data-auto-widget!=false]"), function(i, elem) {
    if($(elem).data("widgetized") != true) {
      $(elem)[$(elem).data("widget")]();
      $(elem).attr("data-widgetized", "true");
    }
  });
});