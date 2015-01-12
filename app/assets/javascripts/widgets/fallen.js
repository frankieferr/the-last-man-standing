$.widget("tlms.fallen", $.tlms.base, {

  _create: function() {
    this._super();
    this.fallenButton = $("[data-top-link=i-have-fallen]")[0];

    this.fallenModal = $(this.element).find("#fallenModal")[0];
    this.submitFallenButton = $(this.fallenModal).find("[data-button=submit]")[0];

    this.dateTimePicker = $(this.fallenModal).find("#datetimepicker")[0];

    this.messageTextarea = $(this.fallenModal).find("#fallen_message")[0];

    this.masturbationCheckbox = $(this.fallenModal).find("#masturbation")[0];
    this.pornographyCheckbox = $(this.fallenModal).find("#pornography")[0];
    this.sexualContactCheckbox = $(this.fallenModal).find("#sexualContact")[0];
    this.otherCheckbox = $(this.fallenModal).find("#other")[0];
    this.otherTextBox = $(this.fallenModal).find("#otherTextBox")[0];

    this.postModal = $(this.element).find("#postModal")[0];

    this.submitPostButton = $(this.postModal).find("[data-button=submit]")[0];
    this.postTextArea = $(this.postModal).find("textarea")[0];

    this._setup();
  },

  _setup: function () {
    this._bind(this.fallenButton, "click", "_openFallenModal");

    this._bind(this.submitFallenButton, "click", "_submitFallenForm");
    this._bind(this.otherCheckbox, "change", "_otherCheckboxChange");

    this._bind(this.postModal, "hidden.bs.modal", "_reload");

    this._bind(this.submitPostButton, "click", "_submitPostForm");
  },

  _openFallenModal: function () {
    $(this.messageTextarea).val("");
    $(this.masturbationCheckbox).prop("checked", false);
    $(this.pornographyCheckbox).prop("checked", false);
    $(this.sexualContactCheckbox).prop("checked", false);
    $(this.otherCheckbox).prop("checked", false);
    $(this.otherTextBox).val("");
    $(this.otherTextBox).prop("disabled", true);

    $(this.dateTimePicker).datetimepicker({
      weekStart: 1,
      todayBtn:  1,
      autoclose: 1,
      todayHighlight: 1,
      startView: 2,
      showMeridian: 1,
    });
    $(this.dateTimePicker).datetimepicker("setDate", new Date(Date.now()))

    $(this.fallenModal).modal("show");
  },

  _submitFallenForm: function () {
    $(this.element).mask("Sending data");
    var data = {
      fallen: {
        message: $(this.messageTextarea).val().trim()
      }
    }

    date = $(this.dateTimePicker).datetimepicker("getDate")
    // can't choose a date in the future. Allow them but send date as now
    if(date > new Date(Date.now())) {
      date = new Date(Date.now())
    }

    data.fallen["datetime"] = date

    data.fallen["masturbation"] = $(this.masturbationCheckbox).prop("checked");
    data.fallen["pornography"] = $(this.pornographyCheckbox).prop("checked");
    data.fallen["sexual_contact"] = $(this.sexualContactCheckbox).prop("checked");
    if($(this.otherCheckbox).prop("checked") && $(this.otherTextBox).val() != "") {
      data.fallen["other"] = $(this.otherTextBox).val().trim();
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
    $(this.postModal).modal("show");
  },

  _otherCheckboxChange: function (evt) {
    $(this.otherTextBox).prop("disabled", !$(this.otherCheckbox).prop("checked"));
  },

  _submitPostForm: function (evt) {
    var message = $(this.postTextArea).val().trim();

    if(message == "") {
      this._reload();
      return;
    }
    $(this.addPostArea).mask("Posting");
    this._sendAjax({
      type: "post",
      url: "/posts/add",
      data: {
        message: message
      },
      success: "_reload",
      complete: "_unmaskElement"
    });
  },

  _reload: function() {
    location.reload();
  },
})