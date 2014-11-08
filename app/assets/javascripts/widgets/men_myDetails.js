//= require widgets/alerts

$.widget("tlms.men_myDetails", $.tlms.alerts, {

  _create: function() {
    this._super();
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
    this._addAlert("NICE")
  },

  _bye: function () {
    console.log("bye");
  },
})