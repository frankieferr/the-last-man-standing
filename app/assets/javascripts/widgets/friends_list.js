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

  deleteFriend: function (evt) {
    var row = this._callFunctionOfWidget(this.friendsTable, "getRowFromElement", evt.currentTarget);
    $(row).remove();
  },

  _getFriendsButtonsObject: function () {
    var buttonObject = {
      icons: [
        {
          icon: "times",
          link_class: "btn-xs btn-danger",
          callback: this.deleteFriend.bind(this)
        },
      ]
    }
    return buttonObject;
  },

})