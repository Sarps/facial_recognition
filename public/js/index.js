
var current_fs, next_fs, previous_fs;
var left, opacity, scale;
var animating;
var canvas = document.querySelector('#overlay');

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	exit = current_fs.data("exit");
	if(exit) SlideEvents[exit]();
	next_fs.show(); 
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			scale = 1 - (1 - now) * 0.2;
			left = (now * 50)+"%";
			opacity = 1 - now;
			current_fs.css({'transform': 'scale('+scale+')', 'position': 'absolute'});
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		easing: 'easeInOutBack'
	});
	entry = next_fs.data("entry");
	if(entry) SlideEvents[entry]();
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	previous_fs.show(); 
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			scale = 0.8 + (1 - now) * 0.2;
			left = ((1-now) * 50)+"%";
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	return false;
})

const SlideEvents = {
	activateCamera: function(){
		if(!navigator.getMedia){
			return displayErrorMessage("Your browser doesn't have support for the webcam interface.");
		}
		navigator.getMedia({video: true},
			function(stream){
				video.src = window.URL.createObjectURL(stream);
				video.play();
				video.onplay = function() {
					showVideo();
				};
			}, function(err){
				displayErrorMessage("There was an error with accessing the camera: " + err, err);
			}
		);
	}
}

function loading(should)
{
	if(should) 
		return loader.classList.remove("hidden");
	loader.classList.add('hidden');
}