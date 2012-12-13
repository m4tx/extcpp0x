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

Clipboard.utilities.createTextArea();

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.method == "copy") {
			Clipboard.copy(request.txt);
		}
});
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getLocalStorage") {
		sendResponse({data: localStorage[request.key]});
    } else {
		sendResponse({});
	}
});
