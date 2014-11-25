$.widget("tlms.times_fallen", $.tlms.base, {

  _create: function() {
    this._super();
    this.timesFallenTable = $(this.element).find("#times_fallen[data-widget=table]");
    this._setup();
  },

  _setup: function () {
    this._sendAjax({
      url: "times_fallen/all",
      success: "_setupTimesFallenTable"
    });
  },

  _setupTimesFallenTable: function (response) {
    this._encodeHtmlToMessage(response)

    this._startWidgetsInsideWidget();
    this._callFunctionOfWidget(this.timesFallenTable, "setColumns", ["Date", "Message"]);
    this._callFunctionOfWidget(this.timesFallenTable, "setData", response);
    this._callFunctionOfWidget(this.timesFallenTable, "createTable");

  },

  _encodeHtmlToMessage: function (response) {
    for (var i = 0, length = response.length; i < length; i++) {
      response[i].message = response[i].message.replace(/\n/g, "<br>").replace(/\r/g, "<br>")
    }
  }

})