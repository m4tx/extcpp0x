// options.js - ExtCpp0x's module
// author: m4tx (www.m4tx.pl)

function loadOptions() {
	if (localStorage['numeration'] != null) {
		document.getElementById('numeration').checked = localStorage['numeration'] == "true";
	}
	if (localStorage['numberColor'] != null) {
		document.getElementById('numberColor').value = localStorage['numberColor'];
	}
	if (localStorage['lineColor'] != null) {
		document.getElementById('lineColor').value = localStorage['lineColor'];
	}
}

function saveOptions(e) {
	localStorage['numeration'] = document.getElementById('numeration').checked;
	localStorage['numberColor'] = document.getElementById('numberColor').value;
	localStorage['lineColor'] = document.getElementById('lineColor').value;
	closeTab();
}

function defaults() {
	document.getElementById('numeration').checked = false;
	document.getElementById('numberColor').value = "AFAFAF";
	document.getElementById('numberColor').focus();
	document.getElementById('numberColor').blur();
	document.getElementById('lineColor').value = "6CE26C";
	document.getElementById('lineColor').focus();
	document.getElementById('lineColor').blur();
}

function closeTab() {
	window.close();
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#saveBtn').addEventListener('click', saveOptions);
	document.querySelector('#cancelBtn').addEventListener('click', closeTab);
	document.querySelector('#defaultsBtn').addEventListener('click', defaults);
	loadOptions();
});


