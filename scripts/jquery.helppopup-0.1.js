// Register the plugin with JQuery.
(function( $ ) {
	$.fn.helpPopup = function( options ) {
	
		return this.each(function() { 
			// Get the this into the local scope.
			var $this = $(this);
		
			// Create some defaults, extending them with any options that were provided.
		    var settings = $.extend( {
		    	'horizontalOffset'	: 15,
		    	'popupWidth'		: '10em',
		    	'popupPosition'		: 'centre'
		    }, options);
		    
		    // Check if the popup already exists.
		    if ( $('#helppopup').length == 0 )
		    {
		    	// Add the popup to the end of the body and hide it initially.
		    	$('body').append('<div id="helppopup" class="floater"></div>');
		    	$('#helppopup').css('width', settings.popupWidth);
		    	$('#helppopup').hide();
		    	
		    	// Add the arrow image to the end of the body and hide it initially.
		    	$('body').append('<img id="helpimage" src="images/help_arrow.png" class="helparrow" />');
		    	$('#helpimage').hide();
		    }
		
			$this.focusin(function() {
				// Hide the popup so the new one fades in nicely.
				$('#helppopup').hide();
		    	$('#helpimage').hide();
		    					
				// Set the help text from the element property.
				$('#helppopup').html($this.attr('popuphelptext'));
				
				// Get the position and width of the element needing help.
				eleOffset = $this.offset();
				var eleWidth = $this.width();
				
				// Calculate the left position of the popup and the image.
				var helpLeft = eleOffset.left + eleWidth + settings.horizontalOffset + 40;
				var imgLeft = eleOffset.left + eleWidth + settings.horizontalOffset;
				
				// Check positioning setting.
				if (settings.popupPosition == 'corner')
				{
					var helpTop = eleOffset.top;
					var imgTop = eleOffset.top;
				}
				else
				{
					// Calculating the top value to vertically centre the popup on the element.
					// NOTE: The inexplicable required random 4 pixel difference for the popup
					// and 3 pixel difference for the image.
					var helpTop = eleOffset.top + ($this.height() / 2) - ($('#helppopup').height() / 2) - 4;
					var imgTop = eleOffset.top + ($this.height() / 2) - ($('#helpimage').height() / 2) + 3;
				}
				
				// Set the position of the popup.	
				$('#helppopup').css('left', helpLeft);
				$('#helppopup').css('top', helpTop);
				$('#helpimage').css('left', imgLeft);
				$('#helpimage').css('top', imgTop);				
				
				// Fade in the message.
				$('#helppopup').fadeIn('fast');
				$('#helpimage').fadeIn('fast');
			});
			
			$this.focusout(function() {
				// Hide the popup and the image.
				$('#helppopup').fadeOut('fast');
				$('#helpimage').fadeOut('fast');
			});
		});
	};
})( jQuery );