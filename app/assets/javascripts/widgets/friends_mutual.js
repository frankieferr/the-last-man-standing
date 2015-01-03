$.widget("tlms.friends_mutual", $.tlms.base, {

  _create: function() {
    this._super();
    this.managerElement = $(this.element).closest("[data-widget=friends_manager]")[0];
    this.mutualFriendsTable = $(this.element).find("#mutual_friends[data-widget=table]");
  },

  setupMutualFriendsTable: function () {
    this._startWidgetsInsideWidget();
    this._callFunctionOfWidget(this.mutualFriendsTable, "setColumns", ["Username", "Name", "Email", "Mutual Friends", this._getMutualFriendsButtonsObject()]);
    this._callFunctionOfWidget(this.mutualFriendsTable, "setData", this._callFunctionOfWidget(this.managerElement, "getMutualFriends"));
    this._callFunctionOfWidget(this.mutualFriendsTable, "createTable");
  },

  _getMutualFriendsButtonsObject: function () {
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
    var row = this._callFunctionOfWidget(this.mutualFriendsTable, "getRowFromElement", evt.currentTarget);

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