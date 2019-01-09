$(window).on("load", function() {
		$(".se-pre-con").fadeOut("slow");;
});


var audio_on = false;
var f = false;
var index = 0;

function play_audio(identificator) {
  if (audio_on) return;
  audio_on = true;
  console.log(identificator);
  $(identificator).trigger("play").on("ended", function(){
	audio_on = false;
	f = true;
	if(Math.random() < 0.7)
		$("#pirat").attr({"src": "../resurse/poze/nevorbeste.png"});
	else
		$("#pirat").attr({"src": "../resurse/poze/rade.png"});
  });
  $("#pirat").attr({"src": "../resurse/poze/vorbeste.gif"});
}
$(document).ready(function () {
	setTimeout(function() {$("#main_window").mousemove(function(){ setTimeout(function() {play_audio("#audio_salut"); $("#main_window").prop("onmousemove", null).off("mousemove")}, 200)});}, 10);
$("#select").click(function(){
	if(f == true) window.location = "../numarare/index.html";
  });
});