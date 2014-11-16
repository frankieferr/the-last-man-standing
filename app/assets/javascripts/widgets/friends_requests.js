$.widget("tlms.friends_requests", $.tlms.base, {

  _create: function() {
    this._super();
    this.managerElement = $(this.element).closest("[data-widget=friends_manager]")[0];
    this.receivedRequestsTable = $(this.element).find("#received_requests[data-widget=table]");
    this.sentRequestsTable = $(this.element).find("#sent_requests[data-widget=table]");
  },

  setupTables: function () {
    this.setupReceivedTable();
    this.setupSentTable();
  },

  setupReceivedTable: function () {
    this._startWidgetsInsideWidget();

    this._callFunctionOfWidget(this.receivedRequestsTable, "setColumns", ["Username", "Name", "Email", this._getReceivedRequestsButtonsObject()]);
    this._callFunctionOfWidget(this.receivedRequestsTable, "setData", this._callFunctionOfWidget(this.managerElement, "getReceivedRequests"));
    this._callFunctionOfWidget(this.receivedRequestsTable, "createTable");
  },

  setupSentTable: function () {
    this._startWidgetsInsideWidget();

    this._callFunctionOfWidget(this.sentRequestsTable, "setColumns", ["Username", "Name", "Email", this._getSentRequestsButtonsObject()]);
    this._callFunctionOfWidget(this.sentRequestsTable, "setData", this._callFunctionOfWidget(this.managerElement, "getSentRequests"));
    this._callFunctionOfWidget(this.sentRequestsTable, "createTable");
  },

  acceptFriend: function (evt) {
    var row = this._callFunctionOfWidget(this.receivedRequestsTable, "getRowFromElement", evt.currentTarget);
    $(row).remove();
  },

  rejectFriend: function (evt) {
    var row = this._callFunctionOfWidget(this.receivedRequestsTable, "getRowFromElement", evt.currentTarget);
    $(row).remove();
  },

  _getReceivedRequestsButtonsObject: function () {
    var buttonObject = {
      icons: [
        {
          icon: "check",
          link_class: "btn-xs btn-primary",
          callback: this.acceptFriend.bind(this)
        },
        {
          icon: "times",
          link_class: "btn-xs btn-danger",
          callback: this.rejectFriend.bind(this)
        },
      ]
    }
    return buttonObject;
  },

  withdrawRequest: function (evt) {
    var row = this._callFunctionOfWidget(this.sentRequestsTable, "getRowFromElement", evt.currentTarget);
    $(row).remove();
  },

  _getSentRequestsButtonsObject: function () {
    var buttonObject = {
      icons: [
        {
          icon: "times",
          link_class: "btn-xs btn-danger",
          callback: this.withdrawRequest.bind(this)
        },
      ]
    }
    return buttonObject;
  },

})