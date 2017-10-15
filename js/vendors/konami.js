'use strict';

$(function(){
	var chrisAdded = false
	$( window ).konami({
		cheat: function() {
			if( !chrisAdded ){
				var people = $( '.people' );
				people.append( '<li><img src="images/People/chris.png" style="height:228px;" class="img-responsive pointer replace-2x"/><a href=""><div><span class="peopleTitle">Chris Manciero</span><span class="peoplePos">Senior UI Developer</span></div></a></li>');
				chrisAdded = true;
			}
		}
	});
}());