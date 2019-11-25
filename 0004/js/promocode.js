$(document).ready(function(){

$('#overlay, #promo-modal').delay(2000).fadeIn();
$('#overlay, #promo-close').click(function(){
	$('#overlay, #promo-modal').fadeOut();
});

$('#promo-copy').click(function(){
	var code = document.querySelector('#promo-code');
	var range = document.createRange();
	range.selectNode(code);
	window.getSelection().addRange(range);
	try {
		var successful = document.execCommand('copy');
		var msg = $('#success-msg').html();
		$('#promo-copy').removeClass('default').addClass('success').html(msg);
	} catch(err) {
		var msg = $('#fail-msg').html();
		$('#promo-copy').removeClass('default').addClass('fail').html(msg);
	};
	window.getSelection().removeAllRanges();
});

});

