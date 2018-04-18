//************************************************************************************
	var key;	
	var tempo;
	var j = 0;
	var times = 0;
	var timer = 0;
	var work = false;
	var music = [];
	var musnotlen = [];
	var keyPressed = {};

//************************************************************************************	
function updateTempoText()
{
	tempo = document.getElementById("tempo").value;
	document.getElementById("tempotext").innerHTML = document.getElementById("tempo").value;
}
//************************************************************************************	
function musicToNumber()
{
	for(var i = 0;i<music.length;++i)
	{
		music[i] = noteToNumber(music[i]);
	}
}
//************************************************************************************	
function Tutorial()
{
	if(music[j] != "0")
	{
		if(j==0)
		{
			work = true;
		}
		howManyAcordKeys(j);
		setTutorialColorByArray(j);
		setTutorialAcordColor(j);
	} else{
		j = 0;
		work = false;
	}
}
//************************************************************************************
function setTutorialAcordColor(k)
{
	if(musnotlen[k+1]=="0"){
		setTutorialColorByArray(k+1);
		return setTutorialAcordColor(k+1);
	}
}
//************************************************************************************
function setTutorialColorByArray(c)
{
	if(document.getElementById("i" + music[c]).className == "white"){
		setBright(music[c], "40");
	} else{
		setInvert(music[c], "20");
	}
}
//************************************************************************************
function setTutorialColorByKey(c)
{
	if(document.getElementById("i" + c).className == "white"){
		setBright(c, "40");
	} else{
		setInvert(c, "20");
	}
}
//************************************************************************************
function noteToNumber(nt)
{
	switch(nt)
	{
		case "c1": nt = "90"; break;
		case "cis1": nt = "83"; break;
		case "d1": nt = "88"; break;
		case "dis1": nt = "68"; break;
		case "e1": nt = "67"; break;
		case "f1": nt = "86"; break;
		case "fis1": nt = "71"; break;
		case "g1": nt = "66"; break;
		case "gis1": nt = "72"; break;
		case "a1": nt = "78"; break;
		case "ais1": nt = "74"; break;
		case "h1": nt = "77"; break;
		case "c2": nt = "84"; break;
		case "cis2": nt = "54"; break;
		case "d2": nt = "89"; break;
		case "dis2": nt = "55"; break;
		case "e2": nt = "85"; break;
		case "f2": nt = "73"; break;
		case "fis2": nt = "57"; break;
		case "g2": nt = "79"; break;
		case "gis2": nt = "48"; break;
		case "a2": nt = "80"; break;
		case "ais2": nt = "189"; break;
		case "h2": nt = "219"; break;
		case "c3": nt = "221"; break;
			
	}
	return nt;
}
//************************************************************************************
function note(notee, leng, b)
{
	const BPM = 60000;
	var tempoo = BPM/b;

	switch(leng)
	{
	
		case "0": leng = 0; break;
		case "1": leng = Math.round((tempoo)*4); break;
		case "2": leng = Math.round((tempoo)*2); break;
		case "4": leng = Math.round(tempoo); break;
		case "8": leng = Math.round((tempoo)/2); break;
		case "16": leng = Math.round((tempoo)/4); break;
		case "32": leng = Math.round((tempoo)/8); break;
			
		case "0": leng = 0; break;
		case "1": leng = Math.round(((tempoo)*4)+((tempoo)*2)); break;
		case "2*": leng = Math.round(((tempoo)*2)+(tempoo)); break;
		case "4*": leng = Math.round(((tempoo))+((tempoo)/2)); break;
		case "8*": leng = Math.round(((tempoo)/2)+((tempoo)/4)); break;
		case "16*": leng = Math.round(((tempoo)/4)+((tempoo)/8)); break;
		case "32*": leng = Math.round(((tempoo)/8)+((tempoo)/16)); break;
			
		case "0": leng = 0; break;
		case "1**": leng = Math.round(((tempoo)*4)+((tempoo)*2)+(tempoo)); break;
		case "2**": leng = Math.round(((tempoo)*2)+((tempoo))+((tempoo)/2)); break;
		case "4**": leng = Math.round(((tempoo))+((tempoo)/2)+((tempoo)/4)); break;
		case "8**": leng = Math.round(((tempoo)/2)+((tempoo)/4)+((tempoo)/8)); break;
		case "16**": leng = Math.round(((tempoo)/4)+((tempoo)/8)+((tempoo)/16)); break;
		case "32**": leng = Math.round(((tempoo)/8)+((tempoo)/16)+((tempoo)/32)); break;
		
	}
	setTimeout("play("+notee+")",timer += leng);
}
//************************************************************************************
 var loadFileFromDevice = function(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
	setFile(reader.result);
	setMusicList(0);
    };
    reader.readAsText(input.files[0]);
  };
//************************************************************************************
function loadFileFromURL(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}
//************************************************************************************
function loadURLFromList()
{
	var path = document.getElementById("musicList").value;
	document.getElementById("FileFromDevice").value = "";
	setFile(loadFileFromURL(path));
	
}
//************************************************************************************
function setMusicList(index)
{
	document.getElementById("musicList").selectedIndex = index;
	
}
//************************************************************************************
function setFile(text)
{
	text = (text.replace(/\s/g, ' ')).split(/[ ]+/);
	tempo = text.splice(0,1);
	document.getElementById("tempo").value = tempo;
	updateTempoText();
	separateNoteLen(text);
	separateMusic(text);
	musicToNumber();
}
//************************************************************************************
function separateNoteLen(data)
{
	musnotlen = ["0"];
	for(var i = 0;i<data.length;++i)
	{
		if(i%2==1)
		{
			musnotlen.push(data[i]);
		}
	}
}

//************************************************************************************
function separateMusic(data)
{
	music = [];
	for(var i = 0;i<data.length;++i)
	{
		if(i%2==0)
		{
			music.push(data[i]);
		}
	}
}
//************************************************************************************
function Melody()
{
	tempo = document.getElementById("tempo").value;
	timer = 0;
	for(var m = 0; m<music.length;++m)
	{
		note(music[m],musnotlen[m], tempo);
	}	
}
//************************************************************************************
	
function play(name){
	var audio = document.getElementById(name);
	
	if (audio.paused) {
		audio.play();
	}else{
		audio.currentTime = 0;
	}	
}
	
//************************************************************************************

	/*function setPause()
	{
		audio.pause();
	}*/
	
	
	/*function turnDown(audio)
	{
		audio.volume -= 0.1;
		while(audio.volume>0.1)
			setTimeout("turnDown()",200);
		
	}*/
//************************************************************************************

//************************************************************************************
function setBright(image, nr)
{
	image = "i" + image;	
	document.getElementById(image).style["filter"] = "brightness("+nr+"%)";
}
	
//************************************************************************************
function setInvert(image, nr)
{
	image = "i" + image;	
	document.getElementById(image).style["filter"] = "invert("+ nr +"%)";
}
//************************************************************************************

function howManyAcordKeys(k)
{
	if(musnotlen[k+1]=="0"){
		times++;
		return howManyAcordKeys(k+1);
	} else {
		times++;
		return times;
	}
}

//************************************************************************************
	document.onkeydown = function (e) {
			
	if ( !e.metaKey ) {
		e.preventDefault();
	}
	
	altKey(e);
	
	keyPressed[key] = true;
	
	if((document.getElementById("i" + key).style["filter"] != "invert(30%)")&&
		(document.getElementById("i" + key).style["filter"] != "brightness(50%)")||
		(document.getElementById("i" + key).style["filter"] == ""))
	{
		play(key);
		if(document.getElementById("i" + key).className == "white"){
			setBright(key, "50");
		} else{
			setInvert(key, "30");
		}
	}
	
	}
	
//************************************************************************************
function AcordPressed(keys)
{
	switch(keys)
	{
		case 1: if(keyPressed[music[j]]){
			times = 0;
			setKeyDefault(keys); j += keys;
			Tutorial();
		}	else {
		setTutorialColorByArray(j);
		}
		break;
		case 2: if((keyPressed[music[j]])&&(keyPressed[music[j+1]])){
			times = 0;
			setKeyDefault(keys); j += keys;
			Tutorial();
		}	else {
		setTutorialColorByArray(j);
		setTutorialColorByArray(j+1);
		}
		break;
		case 3: if((keyPressed[music[j]])&&(keyPressed[music[j+1]])&&(keyPressed[music[j+2]])){
			times = 0;
			setKeyDefault(keys); j += keys;
			Tutorial();
		}	else {
		setTutorialColorByArray(j);
		setTutorialColorByArray(j+1);
		setTutorialColorByArray(j+2);
		}
		break;
		case 4: if((keyPressed[music[j]])&&(keyPressed[music[j+1]])&&(keyPressed[music[j+2]])&&(keyPressed[music[j+3]])){
			times = 0;
			setKeyDefault(keys); j += keys;
			Tutorial();
		}	else {
		setTutorialColorByArray(j);
		setTutorialColorByArray(j+1);
		setTutorialColorByArray(j+2);
		setTutorialColorByArray(j+3);
		}
		break;
		case 5: if((keyPressed[music[j]])&&(keyPressed[music[j+1]])&&(keyPressed[music[j+2]])&&(keyPressed[music[j+3]])&&(keyPressed[music[j+4]])){
			times = 0;
			setKeyDefault(keys); j += keys;
			Tutorial();
		}	else {
		setTutorialColorByArray(j);
		setTutorialColorByArray(j+1);
		setTutorialColorByArray(j+2);
		setTutorialColorByArray(j+3);
		setTutorialColorByArray(j+4);
		}
		break;

		
	}
	
	
}

//************************************************************************************
function setKeyDefault(nr)
{
	for(var i=0;i<nr;++i)
	{
		setBright(music[j+i], "100");
		setInvert(music[j+i], "0");
	}
	
	
}

//************************************************************************************
function altKey(ek)
{
	key = "" + ek.keyCode;
	
	switch(key)
	{
		case "188":key = "84"; break;
		case "190":key = "89"; break;
		case "191":key = "85"; break;
		case "76":key = "54"; break;
		case "186":key = "55"; break;
		case "82":key = "77"; break;
		case "69":key = "78"; break;
		case "87":key = "66"; break;
		case "81":key = "86"; break;
		case "50":key = "71"; break;
		case "51":key = "72"; break;
		case "52":key = "74"; break;
		
	}

}

//************************************************************************************
	window.onkeyup = function (e) {
		
	altKey(e);
	setBright(key, "100");
	setInterval(key, "0");
	
	AcordPressed(times);
	
	keyPressed[key] = false;
		
	}