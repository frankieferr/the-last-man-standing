$.widget("tlms.friends_manager", $.tlms.base, {

  totalAjax: 4,

  _create: function() {
    this._super();
    this.friends = [];
    this.sentRequests = [];
    this.receivedRequests = [];
    this.suggestedFriends = [];

    this.friendsListElement = $(this.element).find("[data-widget=friends_list]")[0];
    this.requestsElement = $(this.element).find("[data-widget=friends_requests]")[0];
    this.suggestedFriendsElement = $(this.element).find("[data-widget=friends_suggested]")[0];

    this._setup();
  },

  _setup: function () {
    $(this.element).mask("Gathering information");

    this._sendAjax({
      url: "/friends/getAllFriends",
      success: "_storeFriends"
    });

    this._sendAjax({
      url: "/friends/getAllReceivedRequests",
      success: "_storeReceivedRequests"
    });

    this._sendAjax({
      url: "/friends/getAllSentRequests",
      success: "_storeSentRequests"
    });

    this._sendAjax({
      url: "/friends/getAllSuggestedFriends",
      success: "_storeSuggestedFriends"
    });
  },

  reset: function () {
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

  _storeSuggestedFriends: function (response) {
    this.suggestedFriends = response;
    this._successAjax();
    this._callFunctionOfWidget(this.suggestedFriendsElement, "setupSuggestedFriendsTable");
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

  getSuggestedFriends: function () {
    return this.suggestedFriends;
  },

})