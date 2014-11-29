$.widget("tlms.recently_fallen", $.tlms.base, {

  totalAjax: 2,

  _create: function() {
    this._super();
    this.ladderTable = $(this.element).find("#recently_fallen[data-widget=table]");
    this._setup();
  },

  _setup: function () {
    $(this.element).mask("Gathering information");
    this._sendAjax({
      url: "ladder/recently_fallen",
      success: "_storeRecentlyFallenInfo"
    });

    this._sendAjax({
      url: "men/current",
      success: "_storeCurrentMan",
    });
  },

  _setupRecentlyFallenTable: function (response) {
    this._startWidgetsInsideWidget();
    this._callFunctionOfWidget(this.ladderTable, "setColumns", ["Username", "Number of Days"]);
    this._callFunctionOfWidget(this.ladderTable, "setData", this.recentlyFallenInfo);
    this._callFunctionOfWidget(this.ladderTable, "setConditionalRules", this._getConditionalRules());
    this._callFunctionOfWidget(this.ladderTable, "createTable");
  },

  _storeRecentlyFallenInfo: function (response) {
    this.recentlyFallenInfo = response;
    console.log(response)
    if(this._successAjax()) {
      this._setupRecentlyFallenTable();
    }
  },

  _storeCurrentMan: function (response) {
    this.currentMan = response;
    if(this._successAjax()) {
      this._setupRecentlyFallenTable();
    }
  },

  _getConditionalRules: function () {
    return [
      {
        rule: {
          attribute: "username",
          value: this.currentMan.username
        },
        styles: {
          "background-color": "lightcoral"
        }
      }
    ]
  }

})