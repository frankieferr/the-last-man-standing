$.widget("tlms.ladder", $.tlms.base, {

  _create: function() {
    this._super();
    this.ladderTable = $(this.element).find("#ladder[data-widget=table]");
    this._setup();
  },

  _setup: function () {
    this._sendAjax({
      url: "ladder/info",
      success: "_setupLadderTable"
    });
  },

  _setupLadderTable: function (response) {
    this._startWidgetsInsideWidget();
    this._callFunctionOfWidget(this.ladderTable, "setColumns", ["Username", "Times Fallen", "Number of Days"]);
    this._callFunctionOfWidget(this.ladderTable, "setData", response);
    this._callFunctionOfWidget(this.ladderTable, "createTable");
  },

})