$.widget("tlms.fallen", $.tlms.base, {

  _create: function() {
    this._super();
    this.fallenForm = $(this.element).find("[data-widget=form]")[0];
    this.submitButton = $(this.element).find("[data-button=submit]")[0];
    this.fallenModal = $(this.element).find("#fallenModal")[0];
    this.fallenButton = $("[data-top-link=i-have-fallen]")[0];
    this.masturbationCheckbox = $(this.element).find("#masturbation")[0];
    this.pornographyCheckbox = $(this.element).find("#pornography")[0];
    this.sexualContactCheckbox = $(this.element).find("#sexualContact")[0];
    this.otherCheckbox = $(this.element).find("#other")[0];
    this.otherTextBox = $(this.element).find("#otherTextBox")[0];
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
    this._bind(this.otherCheckbox, "change", "_otherCheckboxChange");

    this._startWidgetsInsideWidget();
    this._callFunctionOfWidget(this.fallenForm, "setFormAttributes", formAttributes)
    this._callFunctionOfWidget(this.fallenForm, "createForm")
  },

  _openModal: function () {
    $(this.fallenModal).modal("show");
    this._callFunctionOfWidget(this.fallenForm, "clearForm")
    $(this.masturbationCheckbox).prop("checked", false);
    $(this.pornographyCheckbox).prop("checked", false);
    $(this.sexualContactCheckbox).prop("checked", false);
    $(this.otherCheckbox).prop("checked", false);
    $(this.otherTextBox).val("");
    $(this.otherTextBox).prop("disabled", true);

    $('#datetimepicker').datetimepicker({
      weekStart: 1,
      todayBtn:  1,
      autoclose: 1,
      todayHighlight: 1,
      startView: 2,
      showMeridian: 1,
    });
    $('#datetimepicker').datetimepicker("setDate", new Date(Date.now()))
  },

  _submitForm: function () {
    $(this.element).mask("Sending data");
    var data = this._callFunctionOfWidget(this.fallenForm, "serializeForm")
    date = $('#datetimepicker').datetimepicker("getDate")
    // can't choose a date in the future. Allow them but send date as now
    if(date > new Date(Date.now())) {
      date = new Date(Date.now())
    }

    data.fallen["datetime"] = date

    data.fallen["masturbation"] = $(this.masturbationCheckbox).prop("checked");
    data.fallen["pornography"] = $(this.pornographyCheckbox).prop("checked");
    data.fallen["sexual_contact"] = $(this.sexualContactCheckbox).prop("checked");
    if($(this.otherCheckbox).prop("checked") && $(this.otherTextBox).val() != "") {
      data.fallen["other"] = $(this.otherTextBox).val();
    }
    this._sendAjax({
      type: "post",
      url: "/men/fell",
      data: data,
      success: "_manFellSuccess",
      complete: "_unmaskElement",
    });
  },

  _manFellSuccess: function () {
    $(this.fallenModal).modal("hide");
    if(location.pathname == "/times_fallen") {
      location.reload();
    }
  },

  _otherCheckboxChange: function (evt) {
    $(this.otherTextBox).prop("disabled", !$(this.otherCheckbox).prop("checked"));
  }
})