$(document).ready(function($) {
	var $ASIDE = $("aside#sidebar");
	if($ASIDE.length > 0){
		var aside_height = $ASIDE.height();
		var aside_scrollabe = $ASIDE.prop('scrollHeight');
		var trigger_aside_scroll = false;

		if(aside_scrollabe > aside_height) trigger_aside_scroll = true;
		$(window).resize(function(event){
			setTimeout(function(){
				if(aside_scrollabe > aside_height) trigger_aside_scroll = true;
				else trigger_aside_scroll = false;
			},0);
		});
		var lastScrollTop = 0;
		$(this).scroll(function(event){
			if(trigger_aside_scroll){
				var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
				var diff = st-lastScrollTop, scrolltop;
				if (st > lastScrollTop){
					// DOWN
					scrolltop = $ASIDE.scrollTop() + diff;
					$ASIDE.scrollTop(scrolltop);
				} else {
					// UP
					scrolltop = $ASIDE.scrollTop() + diff;
					$ASIDE.scrollTop(scrolltop);
				}
				lastScrollTop = st;
			}
		});
	}
});