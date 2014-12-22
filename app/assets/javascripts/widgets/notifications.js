$.widget("tlms.notifications", $.tlms.base, {

  _create: function() {
    this._super();
    this.notificationsTable = $(this.element).find("#notifications[data-widget=table]");
    this._setup();
  },

  _setup: function () {
    $(this.element).mask("Gathering information");
    this._sendAjax({
      url: "/notifications/all",
      success: "_setupNotificationsTable",
      complete: "_unmaskElement"
    });
  },

  _setupNotificationsTable: function (response) {
    this._startWidgetsInsideWidget();
    this._callFunctionOfWidget(this.notificationsTable, "setColumns", ["Date_Time", "Message", "Link"]);
    this._callFunctionOfWidget(this.notificationsTable, "setData", response);
    this._callFunctionOfWidget(this.notificationsTable, "setConditionalRules", this._getConditionalRules());
    this._callFunctionOfWidget(this.notificationsTable, "createTable");
  },

  _getConditionalRules: function () {
    return [
      {
        rule: {
          attribute: "read",
          value: false
        },
        styles: {
          "background-color": "beige"
        }
      }
    ]
  }
})