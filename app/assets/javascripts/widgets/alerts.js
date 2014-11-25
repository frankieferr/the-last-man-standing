$.widget("tlms.alerts", {

  _create: function() {
    var alerts_area = $.parseHTML(JST["templates/alerts/alerts_area"]());
    $(this.element).prepend(alerts_area);
    this.alerts_area = $(this.element).find("[data-area=alerts]")[0];
  },

  _init: function () {

  },

  addAlert: function(msg, data) {
    if(!data) data = {};
    if(!data.alertType) data.alertType = "info";
    if(!data.timeout) data.timeout = 5000;
    if(!data.remove) data.remove = true;
    var alert = $.parseHTML(JST["templates/alerts/alert"]({msg: msg, alertType: data.alertType}));
    $(this.alerts_area).append(alert);

    if(data.remove) {
      window.setTimeout(function() {
        $(alert).fadeTo(500, 0).slideUp(500, function() {
            $(this).remove();
        });
      }, data.timeout);
    }
  }
})