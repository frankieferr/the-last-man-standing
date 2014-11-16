// OBJECT

Object.defineProperty(Object.prototype, 'copyObjectProperties', {
    value: function(object) {
      for(var index in object) {
        if (object.hasOwnProperty(index)) {
          this[index] = object[index];
        }
      }
    }
});

Object.defineProperty(Object.prototype, 'copyObject', {
    value: function () {
      var copiedObject = {};
      for(var index in this) {
        if (this.hasOwnProperty(index)) {
          copiedObject[index] = this[index];
        }
      }
      return copiedObject;
    }
});

Object.defineProperty(Object.prototype, 'collectToArray', {
    value: function (property) {
      var array = [];
      for(var index in this) {
        if (this.hasOwnProperty(index)) {
          array.push(this[index][property]);
        }
      }
      return array;
    }
});


// ARRAY

Object.defineProperty(Array.prototype, 'collectProperty', {
    value: function (property) {
      return this.map(function(object) {
        return object[property];
      });
    }
});