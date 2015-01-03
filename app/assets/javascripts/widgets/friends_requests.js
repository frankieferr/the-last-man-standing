$.widget("tlms.friends_requests", $.tlms.base, {

  _create: function() {
    this._super();
    this.managerElement = $(this.element).closest("[data-widget=friends_manager]")[0];
    this.receivedRequestsTable = $(this.element).find("#received_requests[data-widget=table]");
    this.sentRequestsTable = $(this.element).find("#sent_requests[data-widget=table]");

    $(this.element).find('#tabs').tab();

  },

  setupTables: function () {
    this.setupReceivedTable();
    this.setupSentTable();
  },

  setupReceivedTable: function () {
    this._startWidgetsInsideWidget();

    this._callFunctionOfWidget(this.receivedRequestsTable, "setColumns", ["Username", "Name", "Email", this._getReceivedRequestsButtonsObject()]);
    this._callFunctionOfWidget(this.receivedRequestsTable, "setHoverOvers", this._getReceivedRequestsHoverOverObject());
    this._callFunctionOfWidget(this.receivedRequestsTable, "setData", this._callFunctionOfWidget(this.managerElement, "getReceivedRequests"));
    this._callFunctionOfWidget(this.receivedRequestsTable, "createTable");
  },

  setupSentTable: function () {
    this._startWidgetsInsideWidget();

    this._callFunctionOfWidget(this.sentRequestsTable, "setColumns", ["Username", "Name", "Email", this._getSentRequestsButtonsObject()]);
    this._callFunctionOfWidget(this.sentRequestsTable, "setHoverOvers", this._getSentRequestsHoverOverObject());
    this._callFunctionOfWidget(this.sentRequestsTable, "setData", this._callFunctionOfWidget(this.managerElement, "getSentRequests"));
    this._callFunctionOfWidget(this.sentRequestsTable, "createTable");
  },

  _acceptFriend: function (evt) {
    var row = this._callFunctionOfWidget(this.receivedRequestsTable, "getRowFromElement", evt.currentTarget);

    $(this.element).mask("Accepting friend");
    this._sendAjax({
      type: "patch",
      url: "/friends/accept",
      data: {
        username: $(row).data("username")
      },
      success: "_friendAccepted",
      complete: "_unmaskElement",
    });
  },

  _friendAccepted: function (response) {
    this._callFunctionOfWidget(this.managerElement, "addAlert", "You and " + response.username + " are now friends.")
    this._callFunctionOfWidget(this.managerElement, "reset");
  },

  _declineFriend: function (evt) {
    var row = this._callFunctionOfWidget(this.receivedRequestsTable, "getRowFromElement", evt.currentTarget);

    $(this.element).mask("Declining friend");
    this._sendAjax({
      type: "delete",
      url: "/friends/decline",
      data: {
        username: $(row).data("username")
      },
      success: "_friendDeclined",
      complete: "_unmaskElement",
    });
  },

  _friendDeclined: function (response) {
    this._callFunctionOfWidget(this.managerElement, "addAlert", "You have declined " + response.username + "'s offer.")
    this._callFunctionOfWidget(this.managerElement, "reset");
  },

  _getReceivedRequestsButtonsObject: function () {
    var buttonObject = {
      icons: [
        {
          icon: "check",
          link_class: "btn-xs btn-primary",
          callback: this._acceptFriend.bind(this)
        },
        {
          icon: "times",
          link_class: "btn-xs btn-danger",
          callback: this._declineFriend.bind(this)
        },
      ]
    }
    return buttonObject;
  },

  _withdrawRequest: function (evt) {
    var row = this._callFunctionOfWidget(this.sentRequestsTable, "getRowFromElement", evt.currentTarget);

    $(this.element).mask("Withdrawing friend");
    this._sendAjax({
      type: "delete",
      url: "/friends/withdraw",
      data: {
        username: $(row).data("username")
      },
      success: "_friendWithdrawn",
      complete: "_unmaskElement",
    });
  },

  _friendWithdrawn: function (response) {
    this._callFunctionOfWidget(this.managerElement, "addAlert", "You have withdrawn  your friend request to " + response.username + ".")
    this._callFunctionOfWidget(this.managerElement, "reset");
  },

  _getSentRequestsButtonsObject: function () {
    var buttonObject = {
      icons: [
        {
          icon: "times",
          link_class: "btn-xs btn-danger",
          callback: this._withdrawRequest.bind(this)
        },
      ]
    }
    return buttonObject;
  },

  _getReceivedRequestsHoverOverObject: function () {
    var hoverOverObject = {
      all: "mutual_friends",
    }
    return hoverOverObject;
  },

  _getSentRequestsHoverOverObject: function () {
    var hoverOverObject = {
      all: "mutual_friends",
    }
    return hoverOverObject;
  },
})