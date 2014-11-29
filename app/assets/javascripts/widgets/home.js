$.widget("tlms.home", $.tlms.base, {

  _create: function() {
    this._super();
    this.fallenForm = $(this.element).find("[data-widget=form]")[0];
    this.submitButton = $(this.element).find("[data-button=submit]")[0];
    this.fallenModal = $(this.element).find("#fallenModal")[0];
    this.fallenButton = $(this.element).find("[data-button=fallen]")[0];
    this._setup();
  },

  _setup: function () {
    this._bind(this.fallenButton, "click", "_openModal");

    this._setupForm();
  },

  _setupForm: function (response) {
    var formAttributes = [
      {
        object: "fallen",
        attribute: "message",
        elementType: "textarea",
      },
    ]

    this._bind(this.submitButton, "click", "_submitForm");

    this._startWidgetsInsideWidget();
    this._callFunctionOfWidget(this.fallenForm, "setFormAttributes", formAttributes)
    this._callFunctionOfWidget(this.fallenForm, "createForm")
  },

  _openModal: function () {
    $(this.fallenModal).modal("show");
    this._callFunctionOfWidget(this.fallenForm, "clearForm")
    this._callFunctionOfWidget(this.fallenForm, "setFocus")
  },

  _submitForm: function () {
    $(this.element).mask("Sending data");

    this._sendAjax({
      type: "post",
      url: "men/fell",
      data: this._callFunctionOfWidget(this.fallenForm, "serializeForm"),
      success: "_manFellSuccess",
      complete: "_unmaskElement",
    });
  },

  _manFellSuccess: function () {
    $(this.fallenModal).modal("hide");
  }
})