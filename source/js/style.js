// style.js - ExtCpp0x's module
// author: programer1234
// Chrome port: m4tx

var style = ".libextcpp0x_nrol" +
"{" +
"   margin: 0px !important;" +
"   padding-left: 55px !important;" +
"}" +
"" +
".libextcpp0x_nrol li" +
"{" +
"   padding: 0px !important;" +
"}" +
"" +
".libextcpp0x_nrol li div" +
"{" +
"   color: #000000;" +
"   min-height: 15px;" +
"   padding: 0px 0px 0px 10px !important;" +
"}" +
"" +
"del" +
"{" +
"   background-color: #FF3737 !important;" +
"   text-decoration: none !important;" +
"}" +
"" +
"ins" +
"{" +
"   background-color: #5DE65D !important;" +
"   text-decoration: none !important;" +
"}" +
"" +
"#libextcpp0x_fastreplyform textarea" +
"{" +
"   visibility: hidden;" +
"   height: 0px;" +
"   width: 0px;" +
"   -webkit-transition: height 0.6s ease-in-out, width 0.6s ease-in-out;" +
"   transition: height 0.6s ease-in-out, width 0.6s ease-in-out;" +
"   display: block;" +
"}" +
"" +
"#libextcpp0x_fastreplyform" +
"{" +
"   visibility: hidden;" +
"   height: 0px;" +
"   width: 0px;" +
"   -webkit-transition: height 0.6s ease-in-out, width 0.6s ease-in-out;" +
"   transition: height 0.6s ease-in-out, width 0.6s ease-in-out;" +
"}" +
"" +
"#libextcpp0x_fastreplysave" +
"{" +
"   display: none;" +
"}" +
"" +
"#libextcpp0x_fastreplyiframe" +
"{" +
"   display: none;" +
"}" +
"";

var tempStyle = ".libextcpp0x_nrol{color: #";
chrome.extension.sendRequest({method: "getLocalStorage", key: "nrColor"}, function(response) {
	tempStyle += response.data + "} .libextcpp0x_nrol li div {border-left: 5px solid #";
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "borColor"}, function(response) {
	tempStyle += response.data + " !important;}";
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "addEffects"}, function(response) {
	if (response.data == "true") {
		tempStyle += "/* author: m4tx */ *, *:hover{-webkit-transition: all 100ms ease-out;transition: all 100ms ease-out;}div#PanelStats div.Panel div.Content:hover{-webkit-transition: background-color 100ms ease-out;transition: background-color 100ms ease-out;}div.Forum#PanelPage table.TopicListLayout tr td{-webkit-transition: all 100ms ease-out;transition: all 100ms ease-out;}div.Forum#PanelPage table.TopicListLayout tr:hover > td:not(.Bar), table.FormatCSV tr:hover > td{background-color: #ffa !important;}table.Grid tr td{-webkit-transition: border 100ms ease-out;transition: border 100ms ease-out;}";
	}
});
chrome.extension.sendRequest({method: "getLocalStorage", key: "disHBar"}, function(response) {
	if (response.data == "true") {
		tempStyle += "html{overflow: auto !important;}";
	}
	{
		var stlEl = document.createElement("style");
		stlEl.setAttribute("type", "text/css");
		var stlElText = document.createTextNode(tempStyle);
		stlEl.appendChild(stlElText);
		document.getElementsByTagName("head")[0].appendChild(stlEl);
	}
});

var stlEl = document.createElement("style");
stlEl.setAttribute("type", "text/css");
var stlElText = document.createTextNode(style);
stlEl.appendChild(stlElText);
document.getElementsByTagName("head")[0].appendChild(stlEl);
