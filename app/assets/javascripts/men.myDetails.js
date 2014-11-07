$.widget("tlms.men_myDetails", {

  _create: function() {
    // var alerts_area = $.parseHTML(JST["templates/alerts_widget/alerts_area"]());
    // $(this.element).prepend(alerts_area);
    this.submitButton = $(this.element).find("[data-button=submit]")[0];
    this.usernameTxt = $(this.element).find("#man_username")[0];
    this.nameTxt = $(this.element).find("#man_name")[0];
    this.emailTxt = $(this.element).find("#man_email")[0];
    console.log("Frankie rules");
  },

  _init: function () {
    this._bind(this.submitButton, "click", "_submitForm");
  },

  _submitForm: function () {
    var man = {
      name: $(this.nameTxt).val(),
      email: $(this.emailTxt).val(),
    }
    this._sendAjax({
      url: "men/update_details",
      data: {man: man},
      success: "_hello",
      error: "_bye",
    });
  },

  _hello: function (data, status) {
    console.log("hello");
    console.log(data)
    console.log(status)
  },

  _bye: function () {
    console.log("bye");
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
  }
})