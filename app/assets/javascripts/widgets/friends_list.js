$.widget("tlms.friends_list", $.tlms.base, {

  _create: function() {
    this._super();
    this.managerElement = $(this.element).closest("[data-widget=friends_manager]")[0];
    this.friendsTable = $(this.element).find("#friends[data-widget=table]");

  },

  setupFriendsTable: function () {
    this._startWidgetsInsideWidget();
    this._callFunctionOfWidget(this.friendsTable, "setColumns", ["Username", "Name", "Email", this._getFriendsButtonsObject()]);
    this._callFunctionOfWidget(this.friendsTable, "setData", this._callFunctionOfWidget(this.managerElement, "getFriends"));
    this._callFunctionOfWidget(this.friendsTable, "createTable");
  },

  _deleteFriend: function (evt) {
    var row = this._callFunctionOfWidget(this.friendsTable, "getRowFromElement", evt.currentTarget);
    $(this.element).mask("Deleting friend");
    this._sendAjax({
      type: "delete",
      url: "friends/delete",
      data: {
        username: $(row).data("username")
      },
      success: "_friendDeleted",
      complete: "_unmaskElement",
    });
  },

  _friendDeleted: function (response) {
    this._callFunctionOfWidget(this.managerElement, "addAlert", "You have deleted " + response.username + ". You are no longer friends.");
    this._callFunctionOfWidget(this.managerElement, "reset");
  },

  _getFriendsButtonsObject: function () {
    var buttonObject = {
      icons: [
        {
          icon: "times",
          link_class: "btn-xs btn-danger",
          callback: this._deleteFriend.bind(this)
        },
      ]
    }
    return buttonObject;
  },

})