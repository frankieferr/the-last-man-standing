$.widget("frankie.table", {
	_create: function() {
    this.columns = [];
    this.data = [];
    this.conditionalRules = [];
    this.hoverOvers = {};
	},

  setColumns: function (columns) {
    this.columns = columns;
  },

  setData: function (data) {
    this.data = data;
  },

  setConditionalRules: function (conditionalRules) {
    this.conditionalRules = conditionalRules;
  },

  setHoverOvers: function (hoverOvers) {
    this.hoverOvers = hoverOvers;
  },

  createTable: function (evenlySpread) {
    if (evenlySpread === undefined) evenlySpread = true;

    var table = $.parseHTML(JST["templates/table/table"]({columns: this.columns}));
    $(this.element).html(table);

    if(this.data.length == 0) {
      this.addNoneRow();
    } else {
      for (var i = 0, length = this.data.length; i < length; i++) {
        this.addRow(this.data[i]);
      }
    }

    if (evenlySpread) this.evenlySpreadRows();
  },

  addRow: function(object) {
    var row = $.parseHTML(JST["templates/table/row"]({
      object: object,
      columns: this.columns,
      hoverOvers: this.hoverOvers
    }));

    $(this.element).find("tbody").append(row);

    // See if there is the object for the icons
    var indexOfObject = this._getIndexOfObject();
    if(indexOfObject != -1) {
      for (var i = 0, length = this.columns[indexOfObject].icons.length; i < length; i++) {
        $(row).find(".fa.fa-" + this.columns[indexOfObject].icons[i].icon).closest("a").click(this.columns[indexOfObject].icons[i].callback)
      }
    }

    // see if conditonal formatting is needed
    if(this.conditionalRules.length) {
      for (var i = 0, length = this.conditionalRules.length; i < length; i++) {
        if($(row).data(this.conditionalRules[i].rule.attribute) == this.conditionalRules[i].rule.value) {
          for(var property in this.conditionalRules[i].styles) {
            $(row).css(property, this.conditionalRules[i].styles[property]);
          }
        }
      };
    }
  },

  _getIndexOfObject: function () {
    for (var i = 0, length = this.columns.length; i < length; i++) {
      if(typeof(this.columns[i]) == "object") {
        return i;
      }
    }
    return -1;
  },

  addNoneRow: function() {
    var none_row = $.parseHTML(JST["templates/table/none_row"]({columns: this.columns.length}));
    $(this.element).find("tbody").html(none_row);
  },

	removeAllRows: function() {
		$(this.element).find("tbody").html("");
	},

  evenlySpreadRows: function () {
    var indexOfObject = this._getIndexOfObject();
    var x = 0;
    var amountOfColumns = this.columns.length;
    if(indexOfObject != -1) {
      x = this.columns[indexOfObject].icons.length * 7;
      amountOfColumns--;
    }
    $(this.element).find("th").css("width", ( 100 - x) / amountOfColumns + "%");
    if(indexOfObject != -1) {
      $(this.element).find("th:nth-child(" + (indexOfObject + 1) + ")").css("width", x + "%");

    }
  },

  getRowFromElement: function (elem) {
    return $(elem).closest("tr")[0];
  }
});