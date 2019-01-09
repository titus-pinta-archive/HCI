
var time_id;
var schimba_img;
var next_pozitie = 0;
var v_start = [{"top": "63%", "left": "23%", "height": "263px","width":"276px"}, //barca
 {"top": "52%", "left": "35%", "height": "149px","width":"367px"}, //jetsky
 {"top": "72%", "left": "75%", "height": "230px","width":"277px"}, //submarin
 {"top": "66%","left": "47%","height": "429px","width": "354px"}, //canoe
 {"top": "31%", "left": "76%", "height": "337px","width":"352px"}] //vapor
var v_sfarsit = {"top": "5%", "left": "3%"}
var cordonate_start = [{"top": "5%", "left": "3%"}, 
{"top": "5%", "left": "23%"}, 
{"top": "5%", "left": "43%"}, 
{"top": "5%", "left": "63%"}, 
{"top": "5%", "left": "83%"}]
//de modificat
var cordonate_sfarsit = [{"top": "75%", "left": "3%","height":"250px","width":"167px","background-size": "100%"}, 
{"top": "75%", "left": "13%","height":"250px","width":"167px","background-size": "100%"}, 
{"top": "75%", "left": "23%","height":"250px","width":"167px","background-size": "100%"}, 
{"top": "75%", "left": "33%","height":"250px","width":"167px","background-size": "100%"}, 
{"top": "75%", "left": "43%","height":"250px","width":"167px","background-size": "100%"}]
var v_sunet = ["#vv0","#vv1","#vv2","#vv3","#vv4"]
var audio_on = false;
var animatie_on = false;
var clicked = false;
var acum = null;
var urmeaza_cifra_sunet = new Array("#cif1"
		,"#cif2"
		,"#cif3"
		,"#cif4");

var cif = false;
var nr_comenzi = 7;
var index = 0;
var index_nr = 0;
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
  if (audio_on) return;
  audio_on = true;
  acum = identificator;
  console.log(identificator,next_pozitie);
  $(identificator).trigger("play").on("ended", function(){
		console.log(index);
		if(Math.random() < 0.7)
			$("#pirat").attr({"src": "../resurse/poze/nevorbeste.png"});
		else
			$("#pirat").attr({"src": "../resurse/poze/rade.png"});
		audio_on = false;
		acum = null;
		if(identificator == "#start_barci"){
			$("#comoara").click(function(){
				window.location = "../gramada/index.html";
			});
		}else if(identificator.includes("#audio_uimire")){
			if(next_pozitie<= 4)play_audio("#cif"+next_pozitie);
		}
  });
  $("#pirat").attr({"src": "../resurse/poze/vorbeste.gif"});
}
function play_audioo() {
  if (audio_on) return;
  audio_on = true;
  console.log("#vv" + $(this).attr("id"));
  $("#vv" + $(this).attr("id")).trigger("play").on("ended", function(){
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

	ev = $("#" + $(this).attr("id") +".delfin");
	if( $( this ).attr('id') == next_pozitie){
		
		animatie_on = true;
		play_audio("#audio_uimire" + (Math.floor(Math.random() * 4) + 1));
		
		time_id = setTimeout(function () {
			ev.animate( cordonate_sfarsit[next_pozitie]
			
			  , 1000, function() {
				$(ev.target).prop("click", null).off("click");
				
				next_pozitie++;
				animatie_on = false;
				if(next_pozitie == 5)
					end_game();
				animatie_on = false;
				});
		});
		$("#" + $(this).attr("id") +".numar").animate({"bottom": "-50px","right":"-100px","font-size":"35px"},1000);
	}
	else {
		time_id = setTimeout(function () {
			play_audio("#audio_hopa");
		}, 2000);
	}

}
function end_game(){
	console.log("END");
	time_id = setTimeout(function () {
			console.log(audio_on,animatie_on);
			//play_audio("#start_barci");
			$(".delfin").toggle('slow');
			$("#main_window").animate({"background-position-y":"500px"},1000,function(){
				$("#pirat").animate( {"bottom": "38%", "left": "1%"}
			  , 1000, function() {
				$(this).prop("onmouseover", null).off("mouseover");
				$(this).prop("onmousout", null).off("mouseout");
				play_audio("#start_barci");
				alege_barca();
			});
			});

		}, 3000);

}
function alege_barca(){
	var nave = 5;
	var url,id;
	for (i=0; i<nave; i++){
		console.log(i);
		  url = "\"../resurse/poze/v/v"+i.toString()+".png\"";
		  id ="#vv"+i.toString();
		  console.log(id)
		  console.log(url);
			$("#delfini_window").append($("<div></div>").addClass("barci").attr('id', i.toString()).css({'background-image' : 'url('+ url +')'}).css(v_start[i]).click(play_audioo));
	}
	url = "\"../resurse/poze/comoara.png\"";
	$("#delfini_window").append($("<div></div>").attr('id','comoara').css({'background-image' : 'url('+ url +')' , "height": "146px","width":"178px" , "top": "77%", "left": "3%"}));

}

$(document).ready(function () {

  cordonate_start = shuffle(cordonate_start);
  cordonate_sfarsit = cordonate_sfarsit;
	var nr_delfini = 5;
  
	$("#buton").css({"top": "5%", "left": "3%"}).click(function(){var a = document.getElementById(acum.substring(1,acum.length));if(a !=null)a.currentTime = a.duration;});
	for (i=0; i<nr_delfini; i++){
		$("#delfini_window").append($("<div></div>").append($("<p>"+ (i+1).toString() +"</p>").addClass("numar").attr('id', i.toString())).addClass("delfin").attr('id', i.toString()).css(cordonate_start[i]).click(right_to_left));
	}
	  setTimeout(function() {$("#main_window").mousemove(function(){ setTimeout(function() {play_audio("#numara_start"); $("#main_window").prop("onmousemove", null).off("mousemove")}, 100)});}, 500);
	  
		$(".se-pre-con").fadeOut("slow");
	});
