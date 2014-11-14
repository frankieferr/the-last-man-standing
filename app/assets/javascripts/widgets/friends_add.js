$.widget("tlms.friends_add", $.tlms.base, {

  _create: function() {
    this._super();
    this.usernameInput = $(this.element).find("input[data-input=username]")[0];
    this.addButton = $(this.element).find("[data-button=add]")[0];
    console.log("YOU ARE MY WORLD STEPHANIE CLARE MONICA XERRI <3")
    this.friends = [];
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

    this._sendAjax({
      url: "friends/getAll",
      success: "_storeFriends",
      complete: "_unmaskElement",
    });
  },

  _storeFriends: function (response) {
    for (var i = 0, length = response.length; i < length; i++) {
      this.friends.push(response[i].username);
    }
  },

  _setupAutocomplete: function (response) {
    this._bind(this.addButton, "click", "_submitAdd");

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
      this.allUsernames.push(response[i].username);
    }
    return response;
  },

  _submitAdd: function () {

    var selectedUsername = $(this.usernameInput).val()
    if(this.allUsernames.indexOf(selectedUsername) == -1) {
      this._addAlert("The username you selected doesn't exist", {alertType:"danger"});
      return;
    }

    if(this.friends.indexOf(selectedUsername) != -1) {
      this._addAlert("You are already friends or a friend request has been sent between you two", {alertType:"danger"});
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
    this.friends.push(response.username);
    // console.log("Success")
  },
})