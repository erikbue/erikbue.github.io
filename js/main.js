'use strict';

$(function(){
	$('#headerscroll').on('click', function(event) {
		var section = $(this).attr('data-section');

		scrollToSection(section);
		event.preventDefault();
	});



	var bPeopleInfoOpen = false;

	function retinaReplace(){
		var images = $(".replace-2x");

      // loop through the images and make them hi-res
      for(var i = 0; i < images.length; i++) {

      	if( images[i].nodeName.toUpperCase() === 'IMG' ){

            // create new image name
            var imageType = images[i].src.substr(-4);
            var imageName = images[i].src.substr(0, images[i].src.length - 4);
            imageName += "@2x" + imageType;

            //rename image
            images[i].src = imageName;
        }
      }
	}

	$(".howWhatWhoMenuButton").on('click', function(){
		if($(".whoWhatHowDropdown").css('visibility') == 'hidden'){
			$(".whoWhatHowDropdown").css('visibility', 'visible');
		}else{
			$(".whoWhatHowDropdown").css('visibility', 'hidden');
		}
	});




	// enable the play button to show the video
	$( '#playVideo' ).on( 'click', function(){
		$("#modalVideo").css( { 'visibility': 'visible' } );
		$("#modalVideo").css( { 'opacity': '1' } );
		$("#modalVideo").modal( 'toggle' );

		player.playVideo();
	});




	// click anywhere outside of the video, closes the modal
	$( '#modalVideo' ).on( 'click', function(){
		$("#modalVideo").css( { 'visibility': 'hidden' } );
		$("#modalVideo").css( { 'opacity': '0' } );
		$("#modalVideo").modal( 'toggle' );

		player.pauseVideo();
	});

	$(document).keyup(function(e) {
  		if (e.keyCode == 27) {
  			// check to see if video player in on screen
  			if( $( '#modalVideo' ).length > 0 ){
  				player.pauseVideo();
  			} 
  			// check to see if a person's info is open
  			else if( bPeopleInfoOpen ){
	  			var arrPeeps = $( '.people' ).find( 'li' );
				// loop through all peeps and find info before showing
				for( var x=0, y = arrPeeps.length; x<y; x+=1 ){
					$( arrPeeps[x] ).css( { 'margin-bottom' : '0px' } );
					var peep = $( arrPeeps[x] ).find( 'a' ).attr( 'data-person' );
					$( '#' + peep ).hide();

					$( arrPeeps[x] ).removeClass( 'selectedPerson' );
					$( arrPeeps[x] ).addClass( 'peopleImgHover' );
				}

				bPeopleInfoOpen = false;
  			}
  		}   // esc
	});




	// replace images with retina images
	if( window.devicePixelRatio === 2 ){
		retinaReplace();
	}




	// show people info on click of profile
	var arrPeeps = $( '.people' ).find( 'li' );
	for( var i = 0, j = arrPeeps.length; i<j; i+=1 ){
		$( arrPeeps[i] ).on( 'click', function(){

			// loop through all peeps and hide info before showing
			for( var x=0, y = arrPeeps.length; x<y; x+=1 ){
				$( arrPeeps[x] ).css( { 'margin-bottom' : '0px' } );
				var peep = $( arrPeeps[x] ).find( 'a' ).attr( 'data-person' );
				$( '#' + peep ).hide();

				$( arrPeeps[x] ).removeClass( 'selectedPerson' );
				$( arrPeeps[x] ).addClass( 'peopleImgHover' );
			}

			var currentMB = $( this ).css( 'margin-bottom' );
			if( currentMB !== '0px' ){
				$( this ).css( { 'margin-bottom' : '0px' } );
				bPeopleInfoOpen = false;

				$( this ).removeClass( 'selectedPerson' );
				$( this ).addClass( 'peopleImgHover' );
			} else {
				// var selectedPerson = $( this ).find( 'a' ).attr( 'data-person' );
				setTimeout( jQuery.proxy( function(){
					var section = $( this ).parents( 'ul' );

					scrollToSection( section, $( this ) );

					$( this ).removeClass( 'peopleImgHover' );
					$( this ).addClass( 'selectedPerson' );
					 }, this ), 400 );

				// setTimeout( jQuery.proxy( function(){
				// 	var position = $( this ).parents( 'ul' ).position();
				// 	var docWidth = $( document ).width();
				// 	if( docWidth <= 768 ){
				// 		position.top += 20;
				// 	}
				// 	$( '#' + selectedPerson ).css( { 'top' : ( position.top + 250)  + 'px' } );
				// 	$( '#' + selectedPerson ).show();

				// 	var selectedPersonHeight = $( '#' + selectedPerson ).height();

				// 	$( this ).css( { 'margin-bottom' : ( selectedPersonHeight + 160 ) + 'px' } );
				// }, this ), 400 );

				// bPeopleInfoOpen = true;
			}
		});
	}
	function scrollToSection( section, person ){
		// $( this ) = person;
		var scrollToSection = $( section );
		$( window ).scrollTo( scrollToSection, 200, { offset:-70,
			onAfter:function(){
				var selectedPerson = person.find( 'a' ).attr( 'data-person' );

					setTimeout( jQuery.proxy( function(){
						var position = person.parents( 'ul' ).position();
						var docWidth = $( document ).width();
						if( docWidth <= 768 ){
							position.top += 20;
						}
						$( '#' + selectedPerson ).css( { 'top' : ( position.top + 250)  + 'px' } );
						$( '#' + selectedPerson ).show();

						var selectedPersonHeight = $( '#' + selectedPerson ).height();

						person.css( { 'margin-bottom' : ( selectedPersonHeight + 160 ) + 'px' } );
					}, this ), 200 );

					bPeopleInfoOpen = true;
			}
		});
	};




	// close people info on close click
	var arrCloseIcons = $( '.peopleInfo_close' );
	for( var i = 0, j = arrCloseIcons.length; i<j; i+=1 ){
		$( arrCloseIcons[i] ).on( 'click', function(){
			var person = $( this ).attr( 'data-person' ),
				li_person = $( '#' + person ).prev(),
				currentMB = $( li_person ).css( 'margin-bottom' );

			if( currentMB !== '0px' ){
				$( li_person ).css( { 'margin-bottom' : '0px' } );
				$( '#' + person ).hide();
				bPeopleInfoOpen = false;

				$( li_person ).removeClass( 'selectedPerson' );
				$( li_person ).addClass( 'peopleImgHover' );
			}
		});
	}
}());






