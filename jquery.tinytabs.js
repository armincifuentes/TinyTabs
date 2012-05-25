(function ($) {

	var d = {
			panelSelector	: '.tab-panel',
			navSelector		: '.tab-nav',
			fromAttr		: 'href',
			toAttr			: 'id',
			startIndex		: 0,
			classActive		: 'on',
			onEvent			: 'click',
			stripHash		: true
		};
	
	var methods = {
	
		init: function (options) {
			
			$.extend(d, options);
			
			return this.each(function () {
				
				var	parent = $(this);
								
				parent.tabs('showTab', d.startIndex);
				
				$(d.navSelector + ' a', parent).on(d.onEvent, function (e) {
					e.preventDefault();
					parent.tabs('showTab', $(this).attr(d.fromAttr));
				});
			});			
			
		},
		
		showTab: function (tab, parent, options) {
			
			$.extend(d, options);
			
			return this.each(function () {
			
				var element = '',
					hash = '=';
				
				if (tab === parseInt(tab)) {
					element = $(d.panelSelector + ':eq(' + tab + ')', $(this));
				} else {
				
					if (d.stripHash) {
						tab = tab.replace('#', '');
					}
					element = $(d.panelSelector + "[" + d.toAttr + "=" + tab + "]", $(this));
					
				}
				
				if (d.stripHash) {
					hash = '=#';
				}
				
				$(d.navSelector + " a[" + d.fromAttr + hash + element.attr(d.toAttr) + "]", $(this)).addClass(d.classActive).siblings().removeClass(d.classActive);
				element.show().siblings(d.panelSelector).hide();
			
			});
			
		}
	}
	
	$.fn.tabs = function (method) {
	
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {		
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist.' );
		}
	}
	
})(jQuery);