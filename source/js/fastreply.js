// fastreply.js - ExtCpp0x's module
// author: xevuel
// Chrome port: m4tx

var openTopic = false;

chrome.extension.sendRequest({method: "getLocalStorage", key: "enFastreply"}, function(response) {
	if (response.data != "true") {
		return;
	}

    var szNewMessage = "Napisz nową wiadomość";
    var szNewPostLink = "./edytuj.php?";

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

    var libextcpp0x_fastreplysave = document.getElementById('libextcpp0x_fastreplysave');
    if(libextcpp0x_fastreplysave != null)
       libextcpp0x_fastreplysave.addEventListener("click", function(evt){
          evt.preventDefault();

          var t = location.pathname + location.search;
          var url = location.search.substring(1, location.search.length);
          url = szNewPostLink + "t" + url.split("&")[0];
          window.history.pushState("", "", url);

          var token = document.getElementById("PanelUserMenu").firstChild.value;

          var params = "Form_InstantSearch=&=szukaj&Post_Title=&Post_Description=" + encodeURIComponent(this.previousSibling.value) + "&DDTxEngine3_Message=dodaj%2Faktualizuj&ajax=ddt&SecurityToken=" + token;
          var ajaxObject = getAjaxObject();
          if(ajaxObject)
          {
             ajaxObject.open("POST", url);
             ajaxObject.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
             ajaxObject.onreadystatechange = function()
             {
                if(ajaxObject.readyState == 4)
                {
                   if(ajaxObject.status == 200)
                   {
                      location.reload(true);
                   }
                   else
                   {
                      var divEl = document.createElement("div");
                      divEl.setAttribute("class", "AjaxLoadingPage");
                      divEl.setAttribute("id", "libextcpp0x_AjaxLoadingPage");
                      divEl.appendChild(document.createTextNode("Wystąpił nieoczekiwany błąd. Ajax odmówił posłuszeństwa :)"));
                      divEl.appendChild(document.createElement("br"));
                      divEl.appendChild(document.createTextNode("Niniejszy błąd wymaga interwencji administratora."));
                      var tempEl = document.getElementById('libextcpp0x_AjaxLoadingPage');
                      tempEl.parentNode.replaceChild(divEl, tempEl);
                   }
                   delete ajaxObject;
                }
             }
             ajaxObject.send(params);
             var divEl = document.createElement("div");
             divEl.setAttribute("class", "AjaxLoadingPage");
             divEl.setAttribute("id", "libextcpp0x_AjaxLoadingPage");
             divEl.appendChild(document.createTextNode("Trwa wysyłanie formularza."));
             divEl.appendChild(document.createElement("br"));
             divEl.appendChild(document.createTextNode("Proszę czekać..."));
             var saveEl = document.getElementById('libextcpp0x_fastreplysave');
             saveEl.parentNode.replaceChild(divEl, saveEl);
          }

          window.history.pushState("", "", t);
       });

    function getAjaxObject()
    {
       var versions = new Array(
          "MSXML2.XMLHTTP.6.0",
          "MSXML2.XMLHTTP.5.0",
          "MSXML2.XMLHTTP.4.0",
          "MSXML2.XMLHTTP.3.0",
          "MSXML2.XMLHTTP",
          "Microsoft.XMLHTTP"
       );

       try
       {
          return new XMLHttpRequest();
       }
       catch(e)
       {
          for(var i in versions)
          {
             try
             {
                return new ActiveXObject(versions[i]);
             }
             catch(e){}
          }
          return null;
       }
    }
});
