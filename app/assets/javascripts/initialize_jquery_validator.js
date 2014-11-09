$( document ).ready( function(){
	jQuery.validator.setDefaults({
    errorPlacement: function(error, element) {
    	$(element).tooltip('destroy');
      setTimeout(function() {
        $(element).tooltip({title: error.text(), placement: 'bottom'});
      }, 200)
    },

    highlight: function(element, errorClass, validClass) {
    	$(element).addClass('error');
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).removeClass('error');
		  $(element).tooltip('destroy');
		}
	});
});