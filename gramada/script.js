$(window).on("load", function() {
		$(".se-pre-con").fadeOut("slow");;
});


var time_id;
var schimba_img;
var next_pozitie = 0;
var cordonate_start = [{"bottom": "1%", "right": "1%"}, {"bottom": "18%", "right": "2%"}, {"bottom": "1%", "right": "11%"}, {"bottom": "12%", "right": "12%"}, {"bottom": "24%", "right": "10%"}, {"bottom": "2%", "right": "22%"}, {"bottom": "14%", "right": "20%"}, {"bottom": "26%", "right": "19%"}]
var start_libere = [true, true, true, true, true, true, true, true];
var cordonate_sfarsit = [{"bottom": "1%", "right": "90%"}, {"bottom": "12%", "right": "89%"}, {"bottom": "23%", "right": "69%"}, {"bottom": "2%", "right": "79%"}, {"bottom": "14%", "right": "77%"}, {"bottom": "25%", "right": "77%"}, {"bottom": "1%", "right": "67%"}, {"bottom": "13%", "right": "68%"}]
var sfarsit_libere = [true, true, true, true, true, true, true, true];
var audio_on = false;
var animatie_on = false;

var width;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function play_audio(identificator) {
  if (audio_on) {return;}
  audio_on = true;
  console.log(identificator);
  //setTimeout(function(){$("#pirat").attr({"src": "../resurse/poze/nevorbeste.png"}); audio_on = false;}, 3000)
  $(identificator).trigger("play").on("ended", function(){
      if(Math.random() < 0.7)
        $("#pirat").attr({"src": "../resurse/poze/nevorbeste.png"});
      else
        $("#pirat").attr({"src": "../resurse/poze/rade.png"});
      audio_on = false;
  });
  $("#pirat").attr({"src": "../resurse/poze/vorbeste.gif"});
}

function right_to_left(ev){
  if (animatie_on || audio_on) {return;}
  if (! ($(("#" + $(ev.target).attr("id") + ":hover")).length > 0)) return;

  let str = $(ev.target).css("right");
  console.log(str);
  if(parseInt((str).substring(0, str.length - 2)) >= width/2){
    $(ev.target).prop("click", null).off("click");
    return;
  }


  animatie_on = true;
  play_audio("#audio_uimire" + (Math.floor(Math.random() * 4) + 1));

  let _next = 0;
  while(! sfarsit_libere[_next]) _next++;
  sfarsit_libere[_next] = false;

  start_libere[parseInt($(ev.target).attr("pozitie"))] = true;
  $(ev.target).attr({"pozitie": _next});

  $(ev.target).animate( cordonate_sfarsit[_next], 1000, function() {
    $(ev.target).prop("click", null).off("click");
    next_pozitie++;
    animatie_on = false;
    console.log(next_pozitie);
  });
}

function left_to_right(ev)
{
  if (animatie_on || audio_on) {return;}
  if (! ($(("#" + $(ev.target).attr("id") + ":hover")).length > 0)) return;

  let str = $(ev.target).css("right");
  console.log(str);
  if(parseInt((str).substring(0, str.length - 2)) <= width/2){
    $(ev.target).prop("click", null).off("click");
    return;
  }

  animatie_on = true;
  play_audio("#audio_uimire" + (Math.floor(Math.random() * 4) + 1));

  let _next = 0;
  while(! start_libere[_next]) _next++;
  start_libere[_next] = false;

  sfarsit_libere[parseInt($(ev.target).attr("pozitie"))] = true;
  $(ev.target).attr({"pozitie": _next});

  $(ev.target).animate( cordonate_start[_next], 1000, function() {
  	$(ev.target).prop("click", null).off("click");
  	next_pozitie--;
  	animatie_on = false;
  	console.log(next_pozitie);
	});
}

$(document).ready(function () {

	let str = $("body").css("width");
	console.log(str);
	width = parseInt((str).substring(0, str.length - 2));

  cordonate_start = shuffle(cordonate_start);
  cordonate_sfarsit = shuffle(cordonate_sfarsit)

  var nr_scoici = Math.floor(Math.random() * 3) + 6;
	nr_scoici = 8;

  for (i=0; i<nr_scoici; i++){
    start_libere[i] = false;
		$("#scoici_window").append($("<div></div>").addClass("scoica").attr({"pozitie": i, "id": ("sco_" + i)}).css(cordonate_start[i]).click(right_to_left));
	}

  setTimeout(function() {$("#main_window").mousemove(function(){ setTimeout(function() {play_audio("#audio_start"); $("#main_window").prop("onmousemove", null).off("mousemove")}, 100)});}, 500);

  $("#barca").click(function(){

      let nr_scoici_in_dreapta = $(".scoica").filter(function(index){
        let str = $(this).css("right");
        return parseInt((str).substring(0, str.length - 2)) >= width/2;
      }).length;

      if(nr_scoici_in_dreapta < 5){
        play_audio("#audio_putin");

        $(".scoica").prop("click", null).off("click");

        $(".scoica").click(right_to_left);

      }else if(nr_scoici_in_dreapta > 5){
        play_audio("#audio_mult");

        $(".scoica").prop("click", null).off("click");

        $(".scoica").click(left_to_right);

      }else if(nr_scoici_in_dreapta == 5){
        play_audio("#audio_felicitari");
        $("#audio_felicitari").bind("ended", function(){setTimeout(function(){ window.location = "../menu/index.html" }, 500)});

    }

  });

});
