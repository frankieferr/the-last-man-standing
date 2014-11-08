//= require widgets/base

$.widget("tlms.men_myDetails", $.tlms.base, {

  _create: function() {
    this._super();
    this.detailsForm = $(this.element).find("[data-widget=form]")[0];
    this.submitButton = $(this.element).find("[data-button=submit]")[0];
    this.usernameTxt = $(this.element).find("#man_username")[0];
    this.nameTxt = $(this.element).find("#man_name")[0];
    this.emailTxt = $(this.element).find("#man_email")[0];

    this._setup();
  },

  _setup: function () {
    var formAttributes = [
      {
        object: "man",
        attribute: "username",
        type: "input",
        disabled: "true",
        rules: {},
      },
      {
        object: "man",
        attribute: "name",
        type: "input",
        rules: {
          required: "true",
        }
      },
      {
        object: "man",
        attribute: "email",
        type: "input",
        rules: {
          required: "true",
          email: "true",
        }
      },
    ]

    this._bind(this.submitButton, "click", "_submitForm");
    this._startWidgetsInsideWidget();
    this._callFunctionOfWidget(this.detailsForm, "setFormAttributes", formAttributes)
    this._callFunctionOfWidget(this.detailsForm, "createForm")
    // $(this.detailsForm).form("setFormAttributes", formAttributes);
    // $(this.detailsForm).form("createForm");
  },

  _submitForm: function () {
    if(!$(this.detailsForm).valid()) {
      this._addAlert("Please check the red boxes. Hover over it to see the problem.", {alertType: "danger"});
      return;
    }
    var man = {
      name: $(this.nameTxt).val(),
      email: $(this.emailTxt).val(),
    }
    this._sendAjax({
      url: "men/update_details",
      data: {man: man},
      success: "_detailsUpdated",
    });
  },

  _detailsUpdated: function (data, status) {
    this._addAlert("The details have been successfully updated")
  },
})