// options.js - ExtCpp0x's module
// author: m4tx (www.m4tx.pl)

var back = chrome.extension.getBackgroundPage();

function loadOptions() {
	if (localStorage['defaultNr'] != null) {
		document.getElementById('defaultNr').checked = (localStorage['defaultNr'] == "true");
	}
	if (localStorage['nrColor'] != null) {
		document.getElementById('nrColor').value = localStorage['nrColor'];
	}
	if (localStorage['borColor'] != null) {
		document.getElementById('borColor').value = localStorage['borColor'];
	}
	if (localStorage['enFastreply'] != null) {
		document.getElementById('enFastreply').checked = (localStorage['enFastreply'] == "true");
	}
	if (localStorage['enCite'] != null) {
		document.getElementById('enCite').checked = (localStorage['enCite'] == "true");
	}
	if (localStorage['addEffects'] != null) {
		document.getElementById('addEffects').checked = (localStorage['addEffects'] == "true");
	}
	if (localStorage['disHBar'] != null) {
		document.getElementById('disHBar').checked = (localStorage['disHBar'] == "true");
	}
}

function saveOptions(e) {
	localStorage['defaultNr'] = document.getElementById('defaultNr').checked;
	localStorage['nrColor'] = document.getElementById('nrColor').value;
	localStorage['borColor'] = document.getElementById('borColor').value;
	localStorage['enFastreply'] = document.getElementById('enFastreply').checked;
	localStorage['enCite'] = document.getElementById('enCite').checked;
	localStorage['addEffects'] = document.getElementById('addEffects').checked;
	localStorage['disHBar'] = document.getElementById('disHBar').checked;

	closeTab();
}

function defaults() {
	document.getElementById('defaultNr').checked = (back.getDefaultValue('defaultNr') == "true");
	
	document.getElementById('nrColor').value = back.getDefaultValue('nrColor');

	document.getElementById('borColor').value = back.getDefaultValue('borColor');
	
	document.getElementById('enFastreply').checked = (back.getDefaultValue('enFastreply') == "true");
	document.getElementById('enCite').checked = (back.getDefaultValue('enCite') == "true");
	document.getElementById('addEffects').checked = (back.getDefaultValue('addEffects') == "true");
	document.getElementById('disHBar').checked = (back.getDefaultValue('disHBar') == "true");
}

function closeTab() {
	window.close();
}

function toggleCite() {
	document.getElementById('enCite').disabled = (!document.getElementById('enFastreply').checked ? "disabled" : "");
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#saveBtn').addEventListener('click', saveOptions);
	document.querySelector('#cancelBtn').addEventListener('click', closeTab);
	document.querySelector('#defaultsBtn').addEventListener('click', defaults);
	document.querySelector('#enFastreply').addEventListener('change', toggleCite);
	loadOptions();
	toggleCite();
});


