$.widget("tlms.men_myDetails", $.tlms.base, {

  _create: function() {
    this._super();
    this.detailsForm = $(this.element).find("[data-widget=form]")[0];
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
        attribute: "username",
        elementType: "input",
        disabled: "true",
        value: response.username,
      },
      {
        object: "man",
        attribute: "name",
        elementType: "input",
        rules: {
          required: "true",
        },
        value: response.name,
      },
      {
        object: "man",
        attribute: "email",
        elementType: "input",
        rules: {
          required: "true",
          email: "true",
        },
        value: response.email,
      },
    ]

    this._bind(this.submitButton, "click", "_submitForm");

    this._startWidgetsInsideWidget();
    this._callFunctionOfWidget(this.detailsForm, "setFormAttributes", formAttributes)
    this._callFunctionOfWidget(this.detailsForm, "createForm")
  },

  _submitForm: function () {
    if(!(this._callFunctionOfWidget(this.detailsForm, "validateForm"))) {
      this.addAlert("Please check the red boxes. Hover over it to see the problem.", {alertType: "danger"});
      return;
    }

    this._sendAjax({
      type: "patch",
      url: "men/update_details",
      data: this._callFunctionOfWidget(this.detailsForm, "serializeForm"),
      success: "_detailsUpdated",
    });
  },

  _detailsUpdated: function (response, status) {
    this.addAlert("The details have been successfully updated")
  },
})