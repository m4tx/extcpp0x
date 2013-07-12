// cite.js - ExtCpp0x's module
// author: xevuel
// Chrome port: m4tx

chrome.extension.sendRequest({method: "getLocalStorage", key: "enFastreply"}, function(response) {
	if (response.data != "true") {
		return;
	}
	chrome.extension.sendRequest({method: "getLocalStorage", key: "enCite"}, function(response) {
		if (response.data != "true") {
			return;
		}
        var docFragDiv = document.createElement("div");

        var PostPanel = document.getElementsByClassName("PostPanel");
        for(var i in PostPanel)
        {
           if(PostPanel[i] instanceof HTMLElement && PostPanel[i].nodeName == "DIV")
              if(openTopic == true)
              {
                 var aEl = document.createElement("a");
                 aEl.setAttribute("href", "#");
                 aEl.setAttribute("id", "libextcpp0x_cite");
                 aEl.appendChild(document.createTextNode("Cytuj"));
                 var divEl = document.createElement("div");
                 divEl.setAttribute("class", "Left");
                 divEl.appendChild(aEl)
                 PostPanel[i].insertBefore(divEl, PostPanel[i].lastChild);
                 aEl.addEventListener("click", function(evt){
                    evt.preventDefault();
                    var text = "";
                    for(var j = 0; j < window.getSelection().rangeCount; j++)
                    {
                       var range = window.getSelection().getRangeAt(j);
                       if(!range.collapsed)
                       {
                          var docFrag = window.getSelection().getRangeAt(j).cloneContents();
                          var parent = window.getSelection().getRangeAt(j).commonAncestorContainer;
                          if(parent != null && parent.nodeName != "#text")
                          {
                             var cloneParent;
                             while(parent.className == undefined || !parent.className.match(/\bDescription\b/))
                             {
                                cloneParent = parent.cloneNode(false);
                                cloneParent.appendChild(docFrag);
                                docFrag = cloneParent;
                                parent = parent.parentNode;
                                if(parent == null)
                                   break;
                             }
                          }
                          if(docFragDiv.hasChildNodes())
                             while (docFragDiv.firstChild)
                                docFragDiv.removeChild(docFragDiv.firstChild);
                          docFragDiv.appendChild(docFrag);
                          text += HTML2STC(docFragDiv);
                       }
                    }
                    if(window.getSelection().rangeCount == 0 || window.getSelection().getRangeAt(0).collapsed)
                       text = HTML2STC(this.parentNode.parentNode.parentNode.parentNode.previousSibling.getElementsByClassName("Description")[0]);

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
                    el.value += "[cytat]" + text + "[/cytat]\n";
                    el.scrollIntoView();
                    el.focus();
                 });
              }
        }

        function HTML2STC(element)
        {
           var ret = "";
           if(element instanceof Text)
              ret += element.nodeValue.replace(/\[/g, "\\[").replace(/\&nbsp;/gi, ' ').replace(/\&lt;/gi, '<').replace(/\&gt;/gi, '>').replace(/\&amp;/gi, '&');

           for(var i = 0; i < element.childNodes.length; i++) //for...in doesn't allow modifying i
           {
              if(element.childNodes[i] instanceof HTMLElement || element.childNodes[i] instanceof Text)
              {
                 if(element.childNodes[i] instanceof Text)
                 {
                    ret += element.childNodes[i].nodeValue.replace(/\[/g, "\\[").replace(/\&nbsp;/gi, ' ').replace(/\&lt;/gi, '<').replace(/\&gt;/gi, '>').replace(/\&amp;/gi, '&');
                    continue;
                 }
                 else if(element.childNodes[i].className.match(/\bcodeInfo\b/))
                 {
                    ret += HTML2STC(element.childNodes[i]);
                    continue;
                 }
                 else if(element.childNodes[i].className.match(/\bcodeCpp\b/))
                 {
                    if(element.childNodes[i].style.display == "none")
                       continue;

                    var b = element.childNodes[i].innerHTML;
                    b = b.replace(/<br>/g, '\n');
                    b = b.replace(/<ol[^>]*?>([^]*?)<\/ol>/g, "$1");
                    b = b.replace(/<li[^>]*?>([^]*?)<\/li>/g, "$1");
                    b = b.replace(/<div[^>]*?>([^]*?)<\/div>/g, "$1\n");
                    b = b.replace(/<span[^>]*?>([^]*?)<\/span>/g, "$1");
                    b = b.replace(/\[/g, "\\[").replace(/\&nbsp;/gi, ' ').replace(/\&lt;/gi, '<').replace(/\&gt;/gi, '>').replace(/\&amp;/gi, '&');
                    if(b[b.length-1] != "\n") b += "\n";
                    ret += "[code src=\"C++\"]" + b + "[/code]\n";
                    continue;
                 }
                 else if(element.childNodes[i].className.match(/\bcodeHaskell\b/))
                 {
                    var b = element.childNodes[i].innerHTML;
                    b = b.replace(/<br>/g, '\n');
                    b = b.replace(/<[^]+?>([^]*?)<\/[^]+?>/g, "$1");
                    b = b.replace(/\[/g, "\\[").replace(/\&nbsp;/gi, ' ').replace(/\&lt;/gi, '<').replace(/\&gt;/gi, '>').replace(/\&amp;/gi, '&');
                    if(b[b.length-1] != "\n") b += "\n";
                    ret += "[code src=\"Haskell\"]" + b + "[/code]\n";
                    continue;
                 }
                 else if(element.childNodes[i].className.match(/\bcode\b/))
                 {
                    var b = element.childNodes[i].innerHTML;
                    b = b.replace(/<br>/g, '\n');
                    b = b.replace(/<[^]+?>([^]*?)<\/[^]+?>/g, "$1");
                    b = b.replace(/\[/g, "\\[").replace(/\&nbsp;/gi, ' ').replace(/\&lt;/gi, '<').replace(/\&gt;/gi, '>').replace(/\&amp;/gi, '&');
                    if(b[b.length-1] != "\n") b += "\n";
                    ret += "[code]" + b + "[/code]\n";
                    continue;
                 }
                 else if(element.childNodes[i].className.match(/\bcite\b/))
                 {
                    ret += "[cytat]" + HTML2STC(element.childNodes[i].firstChild.firstChild.firstChild) + "[/cytat]\n";
                    continue;
                 }
                 else if(element.childNodes[i].className.match(/\bDocRel\b/))
                 {
                    var b = element.childNodes[i].firstChild.innerHTML;
                    var d = /<th><a[^]+?href\="\/dokumentacja\/[^"\d]+?(\d+?)"[^]*?>[^]*?<\/a><\/th>/g;
                    var k = /<th><a[^]+?href\="\/kursy\/[^"\d]+?(\d+?)"[^]*?>[^]*?<\/a><\/th>/g;
                    var a = /<th><a[^]+?href\="\/artykuly\/[^"\d]+?(\d+?)"[^]*?>[^]*?<\/a><\/th>/g;
                    var h = /<th colspan\="2" class\="Title">[^]*?<\/th>/;
                    if(d.exec(b) != null)
                    {
                       b = b.replace(d, "$1, ");
                       b = b.replace(/<tr>([^]*?)<\/tr>/g, "$1");
                       b = b.replace(/<td>([^]*?)<\/td>/g, "");
                       b = b.replace(/[,\s]+$/, ""); //rtrim

                       if(h.exec(b) != null)
                       {
                          b = b.replace(h, "");
                          ret += "[doc_rel list=\"" + b + "\" header]\n";
                          continue;
                       }

                       ret += "[doc_rel list=\"" + b + "\"]\n";
                       continue;
                    }
                    else if(k.exec(b) != null)
                    {
                       b = b.replace(k, "$1, ");
                       b = b.replace(/<tr>([^]*?)<\/tr>/g, "$1");
                       b = b.replace(/<td>([^]*?)<\/td>/g, "");
                       b = b.replace(/[,\s]+$/, ""); //rtrim

                       if(h.exec(b) != null)
                       {
                          b = b.replace(h, "");
                          ret += "[tut_rel list=\"" + b + "\" header]\n";
                          continue;
                       }

                       ret += "[tut_rel list=\"" + b + "\"]\n";
                       continue;
                    }
                    else if(a.exec(b) != null)
                    {
                       b = b.replace(a, "$1, ");
                       b = b.replace(/<tr>([^]*?)<\/tr>/g, "$1");
                       b = b.replace(/<td>([^]*?)<\/td>/g, "");
                       b = b.replace(/[,\s]+$/, ""); //rtrim

                       if(h.exec(b) != null)
                       {
                          b = b.replace(h, "");
                          ret += "[art_rel list=\"" + b + "\" header]\n";
                          continue;
                       }

                       ret += "[art_rel list=\"" + b + "\"]\n";
                       continue;
                    }
                    continue;
                 }
                 else if(element.childNodes[i].className.match(/\bExtraLinkDetails\b/) && element.childNodes[i].nodeName == "SUB")
                 {
                    var d = /\/dokumentacja\/[^"\d]+(\d+)/;
                    var k = /\/kursy\/[^"\d]+(\d+)/;
                    var m;
                    if(m = d.exec(element.childNodes[i].nextSibling.href))
                    {
                       ret += "[doc id=\"" + m[1] + "\" name=\"" + element.childNodes[i].nextSibling.innerHTML + "\"]";
                       i++;
                    }
                    else if(m = k.exec(element.childNodes[i].nextSibling.href))
                    {
                       ret += "[tut id=\"" + m[1] + "\" name=\"" + element.childNodes[i].nextSibling.innerHTML + "\"]";
                       i += 2;
                    }
                    continue;
                 }
                 else if(element.childNodes[i].nodeName == "A")
                 {
                    var a = /\/artykuly\/[^"\d]+(\d+)/;
                    var t = /\/forum\/temat\/[^"\d]+(\d+)/;
                    var m;
                    if(m = a.exec(element.childNodes[i].href))
                       ret += "[art id=\"" + m[1] + "\" name=\"" + element.childNodes[i].innerHTML + "\"]";
                    else if(m = t.exec(element.childNodes[i].href))
                       ret += "[topic id=\"" + m[1] + "\"]";
                    else
                       ret += "[a href=\"" + element.childNodes[i].href + "\" name=\"" + element.childNodes[i].innerHTML + "\"]";
                    continue;
                 }
                 else if(element.childNodes[i].className.match(/\bdivStyle\b/))
                 {
                    ret += "[div]" + HTML2STC(element.childNodes[i].firstChild.firstChild.firstChild) + "[/div]\n";
                    continue;
                 }
                 else if(element.childNodes[i].className.match(/\bdivStyle_Attention\b/))
                 {
                    ret += "[div class=\"uwaga\"]" + HTML2STC(element.childNodes[i].firstChild.firstChild.firstChild) + "[/div]\n";
                    continue;
                 }
                 else if(element.childNodes[i].className.match(/\bdivStyle_Tip\b/))
                 {
                    ret += "[div class=\"tip\"]" + HTML2STC(element.childNodes[i].firstChild.firstChild.firstChild) + "[/div]\n";
                    continue;
                 }
                 else if(element.childNodes[i].className.match(/\bScrolledImg\b/))
                 {
                    if(element.childNodes[i].firstChild.nextSibling)
                       ret += "[img src=\"" + element.childNodes[i].firstChild.nextSibling.firstChild.firstChild.src + "\" alt=\"" + element.childNodes[i].firstChild.nextSibling.firstChild.firstChild.alt + "\"]\n";
                    else
                       ret += "[img src=\"" + element.childNodes[i].firstChild.firstChild.firstChild.src + "\"]\n";
                    continue;
                 }
                 else if(element.childNodes[i].nodeName == "IMG")
                 {
                    ret += "[img src=\"" + element.childNodes[i].src + "\" alt=\"" + element.childNodes[i].alt + "\" autofit]\n";
                    continue;
                 }
                 else if(element.childNodes[i].className.match(/\bFormatCSV\b/))
                 {
                    if(/<th>([^]*?)<\/th>/.exec(element.childNodes[i].firstChild.innerHTML))
                    {
                       ret += "[csv extended header]" + HTML2STC(element.childNodes[i].firstChild) + "[/csv]\n";
                       continue;
                    }

                    ret += "[csv extended]" + HTML2STC(element.childNodes[i].firstChild) + "[/csv]\n";
                    continue;
                 }
                 else if(element.childNodes[i].nodeName == "TR")
                 {
                    ret += HTML2STC(element.childNodes[i]) + "\n";
                    continue;
                 }
                 else if(element.childNodes[i].nodeName == "TD")
                 {
                    ret += "[run]" + HTML2STC(element.childNodes[i]) + "[/run];";
                    continue;
                 }
                 else if(element.childNodes[i].nodeName == "TH")
                 {
                    ret += "[run]" + HTML2STC(element.childNodes[i]) + "[/run];";
                    continue;
                 }
                 else if(element.childNodes[i].className.match(/\bSearchBySTC\b/))
                 {
                    b = element.childNodes[i].firstChild.nextSibling.firstChild.innerHTML.replace(/<li><a[^]*?>([^]*?)<\/a><\/li>/g, "$1\n");
                    ret += "[google]" + b + "[/google]\n";
                    continue;
                 }
                 else if(element.childNodes[i].className.match(/\bFormatPKT\b/))
                 {
                    ret += "[pkt extended]" + HTML2STC(element.childNodes[i]) + "[/pkt]\n";
                    continue;
                 }
                 else if(element.childNodes[i].nodeName == "LI")
                 {
                    ret += "[run]" + HTML2STC(element.childNodes[i]) + "[/run]\n";
                    continue;
                 }
                 else if(element.childNodes[i].nodeName == "BR")
                 {
                    ret += "\n";
                    continue;
                 }
                 else if(element.childNodes[i].nodeName == "H1")
                 {
                    ret += "[h1]" + HTML2STC(element.childNodes[i]) + "[/h1]\n";
                    continue;
                 }
                 else if(element.childNodes[i].nodeName == "H2")
                 {
                    ret += "[h2]" + HTML2STC(element.childNodes[i]) + "[/h2]\n";
                    continue;
                 }
                 else if(element.childNodes[i].nodeName == "H3")
                 {
                    ret += "[h3]" + HTML2STC(element.childNodes[i]) + "[/h3]\n";
                    continue;
                 }
                 else if(element.childNodes[i].nodeName == "B")
                 {
                    ret += "[b]" + HTML2STC(element.childNodes[i]) + "[/b]";
                    continue;
                 }
                 else if(element.childNodes[i].nodeName == "I")
                 {
                    ret += "[i]" + HTML2STC(element.childNodes[i]) + "[/i]";
                    continue;
                 }
                 else if(element.childNodes[i].nodeName == "U")
                 {
                    ret += "[u]" + HTML2STC(element.childNodes[i]) + "[/u]";
                    continue;
                 }
                 else if(element.childNodes[i].nodeName == "S")
                 {
                    ret += "[s]" + HTML2STC(element.childNodes[i]) + "[/s]";
                    continue;
                 }
                 else if(element.childNodes[i].nodeName == "TT")
                 {
                    ret += "[tt]" + HTML2STC(element.childNodes[i]) + "[/tt]";
                    continue;
                 }
                 else if(element.childNodes[i].nodeName == "SUB")
                 {
                    ret += "[sub]" + HTML2STC(element.childNodes[i]) + "[/sub]";
                    continue;
                 }
                 else if(element.childNodes[i].nodeName == "SUP")
                 {
                    ret += "[sup]" + HTML2STC(element.childNodes[i]) + "[/sup]";
                    continue;
                 }
              }
           }
           return ret;
        }
	});
});
