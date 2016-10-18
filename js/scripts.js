$(document).ready(function () {
	
    $('.accordion li > a').click(function () {
        $(this).next().toggle();
        $(this).toggleClass('menuSelected');
    });
	

    $('.navToggle').click(function () {
        $(this).closest('html').toggleClass('openNav');		
    });

    $("#rightColumn").click(function () {
        $("html").removeClass("openNav");

    });

    //$.widget.bridge('uitooltip', $.ui.tooltip);
	
	//$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="tooltip"]').tooltip({
		tooltipClass: 'customToolTip',
        position: {
            my: "right",
            using: function (position, feedback) {
            $(this).css(position);
            $("<div>")
            .addClass("arrow")
            .addClass(feedback.vertical)
            .addClass(feedback.horizontal)
            .appendTo(this);
        }            
        },
        open: function (event, ui) {            
          //  debugger;
    }
    });

	
	$(".wrapper").on("show.bs.tooltip", function() {			 
		if ($(this).hasClass("minimizeSidebar")) {
			$('[data-toggle="tooltip"]').tooltip();
			return false;
		}
	});

    $(".minimizeSidebarButton").click(function () {
        $(".wrapper").toggleClass("minimizeSidebar");
        $(this).toggleClass('maximizeSidebarButton');

    });
	

   $(".wrapper").removeClass("minimizeSidebar");


	$('html').removeClass('openNav');
     function screenSize(){
	 var windowsize = $(window).width();
	 
      if (windowsize < 767) {
		$('.navToggle').show();
      	$('#leftColumn li a').click(function(e){
			$(this).closest('html').removeClass('openNav');	
		 if($(this).next('ul').length > 0){
		   	$(this).closest('html').stop().removeClass('openNav');		
		   	$(this).closest('html').stop().toggleClass('openNav');		
		   }
		   
		  
		   
	    });

      }else if(windowsize > 768 || windowsize != 767){
			$('html').removeClass('openNav');
			 $('.navToggle').hide();

		$('#leftColumn li ul li a').click(function(){
			// $(".wrapper").toggleClass("minimizeSidebar");
			 //$('.minimizeSidebarButton').removeClass('maximizeSidebarButton');
		});
      }
	  }
	screenSize();
	

	function sidebarHeight(){
		$('.sidebar').height($(window).height() - 65);
	}
	sidebarHeight();
    $(window).resize(function () {
        sidebarHeight();
		screenSize();
    });
	
	$("#gotoTop").hide();
	$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#gotoTop').fadeIn();
			} else {
				$('#gotoTop').fadeOut();
			}
	});
		$('#gotoTop').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});


	$('#btnHome').click(function () {			
		$('.navToggle').hide();
	});
	$('#btnDashboard').click(function () {			
		$('.navToggle').show();
		screenSize();
		//$('.navToggle').hide();
	});
		
	

	
	$(window).scroll(function(){
    if($(document).scrollTop() > 0)
    {
		 $('header').css('box-shadow','0 0 15px 1px #bababa');
        
    }
    else
    {
		$('header').css('box-shadow','none');
       
    }
});

	

});

