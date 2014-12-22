$.widget("tlms.ladder", $.tlms.base, {

  totalAjax: 2,

  _create: function() {
    this._super();
    this.ladderTable = $(this.element).find("#ladder[data-widget=table]");
    this._setup();
  },

  _setup: function () {
    $(this.element).mask("Gathering information");
    this._sendAjax({
      url: "/ladder/info",
      success: "_storeLadderInfo"
    });

    this._sendAjax({
      url: "/men/current",
      success: "_storeCurrentMan",
    });
  },

  _setupLadderTable: function (response) {
    this._startWidgetsInsideWidget();
    this._callFunctionOfWidget(this.ladderTable, "setColumns", ["Username", "Name", "Number of Days"]);
    this._callFunctionOfWidget(this.ladderTable, "setData", this.ladderInfo);
    this._callFunctionOfWidget(this.ladderTable, "setConditionalRules", this._getConditionalRules());
    this._callFunctionOfWidget(this.ladderTable, "createTable");
  },

  _storeLadderInfo: function (response) {
    this.ladderInfo = response;
    if(this._successAjax()) {
      this._setupLadderTable();
    }
  },

  _storeCurrentMan: function (response) {
    this.currentMan = response;
    if(this._successAjax()) {
      this._setupLadderTable();
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
          "background-color": "lightblue"
        }
      }
    ]
  }

})