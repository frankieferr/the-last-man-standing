$.widget("frankie.table", {
	_create: function() {
    this.columns = [];
    this.data = [];
	},

  setColumns: function (columns) {
    this.columns = columns;
  },

  setData: function (data) {
    this.data = data;
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
    var row = $.parseHTML(JST["templates/table/row"]({object: object, columns: this.columns}));
    $(this.element).find("tbody").append(row);
    var indexOfObject = this._getIndexOfObject();
    if(indexOfObject != -1) {
      for (var i = 0, length = this.columns[indexOfObject].icons.length; i < length; i++) {
        $(row).find(".fa.fa-" + this.columns[indexOfObject].icons[i].icon).closest("a").click(this.columns[indexOfObject].icons[i].callback)
      }
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