// background.js - ExtCpp0x's for Chrome background page
// author: m4tx

// Special thanks for Manticore:
// https://groups.google.com/forum/?fromgroups=#!topic/chromium-extensions/BJAn5_OwT2g

Clipboard = {}; 
Clipboard.utilities = {}; 

Clipboard.utilities.createTextArea = function(value) { 
	var txt = document.createElement('textarea'); 
	txt.style.position = "absolute"; 
	txt.style.left = "-100%"; 

	if (value != null) 
		txt.value = value; 

	document.body.appendChild(txt); 
	return txt; 
}; 

Clipboard.copy = function(data) { 
	if (data == null) return; 

	var txt = Clipboard.utilities.createTextArea(data); 
	txt.select(); 
	document.execCommand('Copy'); 
	document.body.removeChild(txt); 
}; 

function getDefaultValue(key) {
	switch(key) {
	case "defaultNr":
		return "false";
		break;
	case "nrColor":
		return "AFAFAF";
		break;
	case "borColor":
		return "6CE26C";
		break;
	case "enFastreply":
		return "true";
		break;
	case "enCite":
		return "true";
		break;
	case "addEffects":
		return "false";
		break;
	case "disHBar":
		return "true";
		break;
	}
}

Clipboard.utilities.createTextArea();

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.method == "copy") {
			Clipboard.copy(request.txt);
		}
});
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getLocalStorage") {
		var storage = localStorage[request.key];
		if (storage == null) {
			storage = getDefaultValue(request.key);
		}
		sendResponse({data: storage});
	} else if (request.method == "getDefaultValue") {
		sendResponse({data: getDefaultValue(request.key)});
    } else if (request.method == "getLocaledString") {
		sendResponse({string: chrome.i18n.getMessage(request.string)});
	} else {
		sendResponse({});
	}
});
