$.widget("tlms.friends_suggested", $.tlms.base, {

  _create: function() {
    this._super();
    this.managerElement = $(this.element).closest("[data-widget=friends_manager]")[0];
    this.suggestedFriendsTable = $(this.element).find("#suggested_friends[data-widget=table]");
  },

  setupSuggestedFriendsTable: function () {
    this._startWidgetsInsideWidget();
    this._callFunctionOfWidget(this.suggestedFriendsTable, "setColumns", ["Username", "Name", "Email", "Mutual Friends", this._getSuggestedFriendsButtonsObject()]);
    this._callFunctionOfWidget(this.suggestedFriendsTable, "setData", this._callFunctionOfWidget(this.managerElement, "getSuggestedFriends"));
    this._callFunctionOfWidget(this.suggestedFriendsTable, "createTable");
  },

  _getSuggestedFriendsButtonsObject: function () {
    var buttonObject = {
      icons: [
        {
          icon: "plus",
          link_class: "btn-xs btn-primary",
          callback: this._requestFriendship.bind(this)
        },
      ]
    }
    return buttonObject;
  },

  _requestFriendship: function (evt) {
    var row = this._callFunctionOfWidget(this.suggestedFriendsTable, "getRowFromElement", evt.currentTarget);

    $(this.element).mask("Sending Request");
    this._sendAjax({
      type: "post",
      url: "/friends/add",
      data: {
        username: $(row).data("username")
      },
      success: "_requestSent",
      complete: "_unmaskElement",
    });
  },

  _requestSent: function (response) {
    this._callFunctionOfWidget(this.managerElement, "addAlert", "You have sent a friend request to " + response.username)
    this._callFunctionOfWidget(this.managerElement, "reset");
  }

})