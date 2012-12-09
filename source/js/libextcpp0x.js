// libextcpp0x.js - ExtCpp0x's module
// author: programer1234
// Chrome port by: m4tx (www.m4tx.pl)

$(".header").html("C/C++&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"#\" class=\"libextcpp0x_clhref\" rel=\"1\">Numeruj kod</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"#\" class=\"libextcpp0x_cchref\">Kopiuj kod do schowka</a>");

var code;

$(".libextcpp0x_clhref").click(function(ev){
   ev.preventDefault();
   if($(this).attr("rel") == 1)
   {
      $(this).html("Wyłącz numerowanie");
      $(this).attr("rel", 2);
      var text = $(this).parent().next().html();
      text = text.replace(/<br>+$/gi, '');
      var array = text.split("<br>");
      text = "<ol class=\"libextcpp0x_nrol\">";
      for(var i in array)
      {
         if(array[i] == "")
            array[i] = '&zwnj;';
         text += "<li><div>" + array[i] + "</div></li>";
      }
      text += "</ol>";

      $(this).parent().next().html(text);
   }
   else
   {
      $(this).html("Numeruj kod");
      $(this).attr("rel", 1);
      var text = $(this).parent().next().html();
      text = text.replace(/<ol class=\"libextcpp0x_nrol\">/gi, '');
      text = text.replace(/<\/ol>/gi, '');
      text = text.replace(/<li>/gi, '');
      text = text.replace(/<div>/gi, '');
      text = text.replace(/<\/div>/gi, '');
      text = text.replace(/<\/li>/gi, '<br>');
      text = text.replace(new RegExp(String.fromCharCode(8204), "g"), "");
      text = text.replace(/<br>+$/gi, '');
      $(this).parent().next().html(text);
   }
});

$(".libextcpp0x_cchref").click(function(ev){
   ev.preventDefault();
   if($(this).siblings(".libextcpp0x_clhref").attr("rel") == 1)
   {
      var text = $(this).parent().next().html().replace(/<br>/g,'\r\n');
      text = text.replace(/<\/?[^>]+>/gi, '');
      text = text.replace(/\&nbsp;/gi, ' ');
      text = text.replace(/\&lt;/gi, '<');
      text = text.replace(/\&gt;/gi, '>');
      text = text.replace(/\&amp;/gi, '&');
      
      chrome.extension.sendMessage({txt: text});
   }
   else
   {
      var text = $(this).parent().next().html().replace(/<\/li>/g,'\r\n');
      text = text.replace(/<\/?[^>]+>/gi, '');
      text = text.replace(/\&nbsp;/gi, ' ');
      text = text.replace(/\&lt;/gi, '<');
      text = text.replace(/\&gt;/gi, '>');
      text = text.replace(/\&amp;/gi, '&');
      
      chrome.extension.sendMessage({txt: text});
   }
});
