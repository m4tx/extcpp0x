// fastreply.js - ExtCpp0x's module
// author: programer1234
// Chrome port: m4tx

var openTopic = false;

chrome.extension.sendRequest({method: "getLocalStorage", key: "enFastreply"}, function(response) {
	if (response.data != "true") {
		return;
	}
	var szNewMessage = "Napisz nową wiadomość";

	var PageInfo = document.getElementsByClassName("PageInfo");
	if(PageInfo.length != 0)
	{
	   var saveEl = document.createElement("a");
	   saveEl.setAttribute("href", "#");
	   saveEl.setAttribute("id", "libextcpp0x_fastreplysave");
	   saveEl.appendChild(document.createTextNode("Zapisz zmiany"));
	   var divEl = document.createElement("div");
	   divEl.setAttribute("id", "libextcpp0x_fastreplyform");
	   divEl.appendChild(document.createElement("textarea"));
	   divEl.appendChild(saveEl);
	   PageInfo[0].appendChild(divEl);
	}

	var TopicPanel = document.getElementsByClassName("TopicPanel");
	if(TopicPanel.length != 0)
	{
	   var Left = TopicPanel[0].getElementsByClassName("Left");
	   for(var i in Left)
	   {
		  if (Left[i] instanceof HTMLElement)
			 if(Left[i].firstChild.innerHTML == szNewMessage)
				openTopic = true;
	   }
	   if(openTopic == true)
	   {
		  var aEl = document.createElement("a");
		  aEl.setAttribute("href", "#");
		  aEl.setAttribute("id", "libextcpp0x_fastreply");
		  aEl.appendChild(document.createTextNode("Szybka odpowiedź"));
		  var divEl = document.createElement("div");
		  divEl.setAttribute("class", "Left");
		  divEl.appendChild(aEl)
		  TopicPanel[0].appendChild(divEl);
	   }
	}

	var AccountName = document.getElementsByClassName("AccountName");
	for(var i in AccountName)
	{
	   if(AccountName[i] instanceof HTMLElement)
		  AccountName[i].firstChild.addEventListener("click", function(evt){

			 if(!openTopic) return;

			 evt.preventDefault();
			 var form = document.getElementById('libextcpp0x_fastreplyform');
			 var el = form.getElementsByTagName('textarea')[0];
			 el.nextSibling.style.display = "inline";
			 form.style.visibility = "visible";
			 form.style.height = "240px";
			 form.style.width = "100%";
			 el.style.height = "200px";
			 el.style.width = "300%";
			 el.style.visibility = "visible";
			 document.getElementById("libextcpp0x_fastreply").innerHTML = "Anuluj odpowiadanie";
			 el.value += "[b]@" + this.innerHTML + "[/b],\n";
			 el.scrollIntoView();
			 el.focus();
		  });
	}

	var libextcpp0x_fastreply = document.getElementById('libextcpp0x_fastreply');
	if(libextcpp0x_fastreply != null)
	   libextcpp0x_fastreply.addEventListener("click", function(evt){
		  evt.preventDefault();
		  var form = document.getElementById('libextcpp0x_fastreplyform');
		  var el = form.getElementsByTagName('textarea')[0];
		  if(el.style.visibility == "visible")
		  {
			 el.style.height = "0px";
			 el.style.width = "0%";
			 el.style.visibility = "hidden";
			 form.style.visibility = "hidden";
			 form.style.height = "0px";
			 form.style.width = "0%";
			 el.nextSibling.style.display = "none";
			 this.innerHTML = "Szybka odpowiedź";
		  }
		  else
		  {
			 el.nextSibling.style.display = "inline";
			 form.style.visibility = "visible";
			 form.style.height = "240px";
			 form.style.width = "100%";
			 el.style.height = "200px";
			 el.style.width = "300%";
			 el.style.visibility = "visible";
			 this.innerHTML = "Anuluj odpowiadanie";
		  }
	   });
});
