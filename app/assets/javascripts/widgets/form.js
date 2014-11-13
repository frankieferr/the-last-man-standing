$.widget("tlms.form", {

  _defaultFormAttribute: {
    object: "object",
    attribute: "attribute",
    elementType: "input",
    type: "text",
    rules: {},
    disabled: false,
    value: "",
  },

  _create: function() {
    var theForm = $.parseHTML(JST["templates/form/form_area"]());
    $(this.element).append(theForm);

    this.theForm = $(this.element).find("form")[0];
  },

  _init: function () {

  },

  createForm: function () {
    if(!this.formAttributes) {
      return;
    }

    for (var i = 0, length = this.formAttributes.length; i < length; i++) {
      var formAttribute = this._defaultFormAttribute.copyObject();
      formAttribute.copyObjectProperties(this.formAttributes[i]);
      this.formAttributes[i] = formAttribute;
      var formAttributeElem = $.parseHTML(JST["templates/form/form_attribute"]({formAttribute: formAttribute}));
      $(this.theForm).append(formAttributeElem);
      this.formAttributes[i]["elem"] = formAttributeElem;
    }
  },

  setFormAttributes: function (formAttributes) {
    this.formAttributes = formAttributes;
  },

  validateForm: function () {
    return $(this.theForm).valid();
  },

  serializeForm: function () {
    if(!this.formAttributes) {
      return;
    }

    var serialized = {}
    for (var i = 0, length = this.formAttributes.length; i < length; i++) {
      if(!serialized[this.formAttributes[i].object]) {
        serialized[this.formAttributes[i].object] = {};
      }
      serialized[this.formAttributes[i].object][this.formAttributes[i].attribute] = $(this.formAttributes[i].elem).find("input").val();
    }

    return serialized;
  },
})