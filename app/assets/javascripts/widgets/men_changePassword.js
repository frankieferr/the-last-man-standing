$.widget("tlms.men_changePassword", $.tlms.base, {

  _create: function() {
    this._super();
    this.changePasswordForm = $(this.element).find("[data-widget=form]")[0];
    this.submitButton = $(this.element).find("[data-button=submit]")[0];

    this._setup();
  },

  _setup: function () {

    $(this.element).mask("Gathering information");
    this._sendAjax({
      url: "men/current",
      success: "_setupForm",
      complete: "_unmaskElement",
    });
  },

  _setupForm: function (response) {
    var formAttributes = [
      {
        object: "man",
        attribute: "password",
        elementType: "input",
        type: "password",
        rules: {
          required: "true",
        },
      },
      {
        object: "man",
        attribute: "password_confirmation",
        elementType: "input",
        type: "password",
        rules: {
          equalTo:  "#man_password",
        },
      },
    ]

    this._bind(this.submitButton, "click", "_submitForm");

    this._startWidgetsInsideWidget();
    this._callFunctionOfWidget(this.changePasswordForm, "setFormAttributes", formAttributes)
    this._callFunctionOfWidget(this.changePasswordForm, "createForm")
  },

  _submitForm: function () {
    if(!(this._callFunctionOfWidget(this.changePasswordForm, "validateForm"))) {
      this._addAlert("Please check the red boxes. Hover over it to see the problem.", {alertType: "danger"});
      return;
    }

    this._sendAjax({
      type: "patch",
      url: "men/update_password",
      data: this._callFunctionOfWidget(this.changePasswordForm, "serializeForm"),
      success: "_passwordUpdated",
    });
  },

  _passwordUpdated: function (response, status) {
    this._addAlert("Your password has been successfully updated")
  },
})