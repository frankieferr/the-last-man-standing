$.widget("tlms.friends_manager", $.tlms.base, {

  _create: function() {
    this._super();
    this.successfulAjax = 0;
    this.totalAjax = 3;
    this.friends = [];
    this.sentRequests = [];
    this.receivedRequests = [];

    this.friendsListElement = $(this.element).find("[data-widget=friends_list]")[0];
    this.requestsElement = $(this.element).find("[data-widget=friends_requests]")[0];

    this._setup();
  },

  _setup: function () {
    $(this.element).mask("Gathering information");

    this._sendAjax({
      url: "friends/getAllFriends",
      success: "_storeFriends"
    });

    this._sendAjax({
      url: "friends/getAllReceivedRequests",
      success: "_storeReceivedRequests"
    });

    this._sendAjax({
      url: "friends/getAllSentRequests",
      success: "_storeSentRequests"
    });
  },

  reset: function () {
    this.successfulAjax = 0;
    this._setup();
  },

  _storeFriends: function (response) {
    this.friends = response;
    this._successAjax();
    this._callFunctionOfWidget(this.friendsListElement, "setupFriendsTable");
  },

  _storeReceivedRequests: function (response) {
    this.receivedRequests = response;
    this._successAjax();
    this._callFunctionOfWidget(this.requestsElement, "setupReceivedTable");
  },

  _storeSentRequests: function (response) {
    this.sentRequests = response;
    this._successAjax();
    this._callFunctionOfWidget(this.requestsElement, "setupSentTable");
  },

  _successAjax: function (response) {
    this.successfulAjax++;
    if(this.successfulAjax == this.totalAjax) {
      this._unmaskElement();
    }
  },

  getFriends: function () {
    return this.friends;
  },

  getReceivedRequests: function () {
    return this.receivedRequests;
  },

  getSentRequests: function () {
    return this.sentRequests;
  },

})