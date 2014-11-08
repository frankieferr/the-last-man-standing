//= require widgets/alerts

$.widget("tlms.base", $.tlms.alerts, {

  _create: function() {
    this._super();
  },

  _init: function () {
    this._super();
  },


  _sendAjax: function (data) {
    $.ajax({
      url: data.url,
      type: data.type || "get",
      dataType: data.dataType || "json",
      data: data.data,
      success: (data.success && this[data.success] ? this[data.success]  : this._successCallbackFallback).bind(this),
      error: (data.error && this[data.error] ? this[data.error].bind(this)  : this._errorCallbackFallback).bind(this),
      complete: (data.complete && this[data.complete] ? this[data.complete].bind(this)  : this._completeCallbackFallback).bind(this),
    });
  },

  _bind: function (elem, action, callback) {
    $(elem)[action](this[callback].bind(this))
  },

  _successCallbackFallback: function (data, status) {
    console.log("You didn't pass in a success function");
    console.log("data", data);
    console.log("status", status);

    this._addAlert("The action you performed succeeded");
  },

  _errorCallbackFallback: function (data, status, error) {
    console.log("An error occurred and you didn't pass in an error function");
    console.log("data", data);
    console.log("status", status);
    console.log("error", error);

    this._addAlert("Something went wrong", "danger");
  },

  _completeCallbackFallback: function () {

  },

  _startWidgetsInsideWidget: function () {
    $.each($(this.element).find("[data-widget][data-auto-widget!=false]"), function(i, elem) {
      $(elem)[$(elem).data("widget")]();
    });
  },

  _callFunctionOfWidget: function (elem, theFunction, parameter) {
    return $(elem)[$(elem).data("widget")](theFunction, parameter);
  }
})