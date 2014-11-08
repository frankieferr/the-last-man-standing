$.widget("tlms.base", {

  _create: function() {

  },

  _init: function () {

  },


  _sendAjax: function (data) {
    var success = function (data, status) {
      console.log("You didn't pass in a success function");
      console.log("data", data);
      console.log("status", status);
    };

    var error = function (data, status, error) {
      console.log("An error occurred and you didn't pass in an error function");
      console.log("data", data);
      console.log("status", status);
      console.log("error", error);
    };

    var complete = function () {

    };

    $.ajax({
      url: data.url,
      type: data.type || "get",
      dataType: data.dataType || "json",
      data: data.data,
      success: data.success && this[data.success] ? this[data.success].bind(this)  : success,
      error: data.error && this[data.error] ? this[data.error].bind(this)  : error,
      complete: data.complete && this[data.complete] ? this[data.complete].bind(this)  : complete,
    });
  },

  _bind: function (elem, action, callback) {
    $(elem)[action](this[callback].bind(this))
  },
})