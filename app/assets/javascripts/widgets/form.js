$.widget("tlms.form", {

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

    for(var index in this.formAttributes) {
      if(this.formAttributes.hasOwnProperty(index)) {
        var formAttribute = $.parseHTML(JST["templates/form/form_attribute"](this.formAttributes[index]));
        $(this.theForm).append(formAttribute);
      }
    }
  },

  setFormAttributes: function (formAttributes) {
    this.formAttributes = formAttributes;
  },
})