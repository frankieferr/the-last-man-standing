$.widget("tlms.friends_add", $.tlms.base, {

  _create: function() {
    this._super();
    this.managerElement = $(this.element).closest("[data-widget=friends_manager]")[0];
    this.usernameInput = $(this.element).find("input[data-input=username]")[0];
    this.addButton = $(this.element).find("[data-button=add]")[0];
    this.allUsernames = [];

    this._setup();
  },

  _setup: function () {
    $(this.element).mask("Gathering information");
    this._sendAjax({
      url: "men/all",
      success: "_setupAutocomplete",
      complete: "_unmaskElement",
    });
  },

  _setupAutocomplete: function (response) {
    this._bind(this.addButton, "click", "_submitAdd");

    this.allUsernames = response.collectProperty("username");

    $(this.usernameInput).autocomplete({
      minLength: 0,
      source: this._addValueToReponse(response),
      focus: function( event, ui ) {
        $(this.usernameInput).val( ui.item.username );
        return false;
      }.bind(this),
      select: function( event, ui ) {
        $(this.usernameInput).val( ui.item.username );
        return false;
      }.bind(this)
    }).data("ui-autocomplete")._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<a><i class='fa fa-user'></i> &nbsp;" + item.username + "<br>" + (item.name ? item.name + " - " + item.email : "&nbsp;") + "</a>" )
        .appendTo( ul );
    };

  },

  _addValueToReponse: function (response) {
    for (var i = 0, length = response.length; i < length; i++) {
      response[i].value = response[i].username
    }
    return response;
  },

  _submitAdd: function () {
    var selectedUsername = $(this.usernameInput).val()

    if(this.allUsernames.indexOf(selectedUsername) == -1) {
      this._addAlert("The username you selected doesn't exist", {alertType:"danger"});
      return;
    }

    var currentFriends = this._callFunctionOfWidget(this.managerElement, "getFriends").collectProperty("username");
    if(currentFriends.indexOf(selectedUsername) != -1) {
      this._addAlert("You are already friends", {alertType:"danger"});
      return;
    }

    var currentReceivedRequests = this._callFunctionOfWidget(this.managerElement, "getReceivedRequests").collectProperty("username");
    if(currentReceivedRequests.indexOf(selectedUsername) != -1) {
      this._addAlert("They have already sent you a friend request", {alertType:"danger"});
      return;
    }

    var currentSentRequests = this._callFunctionOfWidget(this.managerElement, "getSentRequests").collectProperty("username");
    if(currentSentRequests.indexOf(selectedUsername) != -1) {
      this._addAlert("You have already sent them a friend request", {alertType:"danger"});
      return;
    }

    this._sendAjax({
      type: "post",
      url: "friends/add",
      data: {
        username: selectedUsername
      },
      success: "_friendAdded",
    });
  },

  _friendAdded: function (response, status) {
    this._addAlert("You have sent a friend request to " + response.username)
    // this.friends.push(response.username);
    $(this.usernameInput).val("");
    // console.log("Success")

    this._callFunctionOfWidget(this.managerElement, "reset");
  },
})