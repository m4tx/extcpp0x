// code.js - ExtCpp0x's module
// author: programer1234
// Chrome port: m4tx

var headEl = document.createElement("div");
headEl.setAttribute("class", "header");
var nbsp = "";
for(var i = 0; i < 5; i++)
   nbsp += String.fromCharCode(160);
headEl.appendChild(document.createTextNode("C/C++" + nbsp));
var anrEl = document.createElement("a");
anrEl.setAttribute("href", "#");
anrEl.setAttribute("class", "libextcpp0x_clhref");
anrEl.setAttribute("rel", "1");
anrEl.appendChild(document.createTextNode("Numeruj kod"));
headEl.appendChild(anrEl);
headEl.appendChild(document.createTextNode(nbsp));
var anrEl = document.createElement("a");
anrEl.setAttribute("href", "#");
anrEl.setAttribute("class", "libextcpp0x_cchref");
anrEl.appendChild(document.createTextNode("Kopiuj kod do schowka"));
headEl.appendChild(anrEl);

var header = document.getElementsByClassName("header");
for(var i in header)
   if(header[i] instanceof HTMLElement && header[i].nextSibling.className.match(/\bcodeCpp\b/))
      header[i].parentNode.replaceChild(headEl.cloneNode(true), header[i]);

chrome.extension.sendRequest({method: "getLocalStorage", key: "defaultNr"}, function(response) {
   if (response.data == "true")
   {
      var libextcpp0x_clhref = document.getElementsByClassName("libextcpp0x_clhref");
      for(var i in libextcpp0x_clhref)
      {
         if (libextcpp0x_clhref[i] instanceof Element)
            libextcpp0x_clhref[i].click();
      }
   }
});

var libextcpp0x_clhref = document.getElementsByClassName("libextcpp0x_clhref");
for(var i in libextcpp0x_clhref)
{
   if (libextcpp0x_clhref[i] instanceof Element)
      libextcpp0x_clhref[i].addEventListener("click", function(evt){
         evt.preventDefault();
         if(this.rel == 1)
         {
            this.innerHTML = "Wyłącz numerowanie";
            this.rel = 2;

            if((this.parentNode.parentNode.childNodes[2] instanceof HTMLElement) && this.parentNode.parentNode.childNodes[2].style.display == "none")
            {
               this.parentNode.parentNode.childNodes[1].style.display = "none";
               this.parentNode.parentNode.childNodes[2].style.display = "block";
               return;
            }

            text = document.createElement("ol");
            text.setAttribute("class", "libextcpp0x_nrol");
            var liEl = document.createElement("li");
            var divEl = document.createElement("div");

            for(var j = 0; j < this.parentNode.nextSibling.childNodes.length; j++)
            {
               if(!(this.parentNode.nextSibling.childNodes[j] instanceof HTMLElement) && !(this.parentNode.nextSibling.childNodes[j] instanceof Text))
                  continue;
               if (this.parentNode.nextSibling.childNodes[j].nodeType == 1 || this.parentNode.nextSibling.childNodes[j].nodeType == 3)
               {
                  if(this.parentNode.nextSibling.childNodes[j].nodeName == "BR")
                  {
					 if(divEl.innerHTML == "")
                         divEl.innerHTML = "&zwnj;";
                     liEl.appendChild(divEl);
                     text.appendChild(liEl);
                     liEl = document.createElement("li");
                     divEl = document.createElement("div");
                  }
                  else
                  {
                     if(this.parentNode.nextSibling.childNodes[j].nodeType == 1)
                     {
                        divEl.appendChild(this.parentNode.nextSibling.childNodes[j].cloneNode(true));
                     }
                     else if(this.parentNode.nextSibling.childNodes[j].nodeType == 3)
                        divEl.appendChild(document.createTextNode(this.parentNode.nextSibling.childNodes[j].nodeValue));
                  }
               }

            }
            if(divEl.childNodes.length > 0)
            {
               liEl.appendChild(divEl);
               text.appendChild(liEl);
            }
            var newEl = document.createElement("div");
            newEl.setAttribute("class", this.parentNode.nextSibling.getAttribute("class"));
            newEl.appendChild(text);
            newEl.setAttribute("style", "display: block;");
            this.parentNode.parentNode.appendChild(newEl);
            this.parentNode.nextSibling.setAttribute("style", "display: none;");

         }
         else
         {
            this.innerHTML = "Numeruj kod";
            this.rel = 1;

            if((this.parentNode.parentNode.childNodes[1] instanceof HTMLElement) && this.parentNode.parentNode.childNodes[1].style.display == "none")
            {
               this.parentNode.parentNode.childNodes[2].style.display = "none";
               this.parentNode.parentNode.childNodes[1].style.display = "block";
            }
         }
      });
}

var libextcpp0x_cchref = document.getElementsByClassName("libextcpp0x_cchref");
for(var i in libextcpp0x_cchref)
{
   if (libextcpp0x_cchref[i] instanceof Element)
      libextcpp0x_cchref[i].addEventListener("click", function(evt){
         evt.preventDefault();
         var text = this.parentNode.nextSibling.innerHTML.replace(/<br>/g,'\r\n').replace(/<\/?[^>]+>/gi, '').replace(/\&nbsp;/gi, ' ').replace(/\&lt;/gi, '<').replace(/\&gt;/gi, '>').replace(/\&amp;/gi, '&');
         chrome.extension.sendMessage({method: "copy", txt: text});
      });
}
