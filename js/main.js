var button = document.querySelector(".js-button");
var result = document.querySelector(".js-result");
var preloader = document.querySelector(".js-preloader");

button.addEventListener("click", executeScript);

function executeScript() {
	chrome.tabs.executeScript({
    	code: 'scanStyles()'
	}, getProp);

	preloader.classList.remove("uk-hidden");

	function getProp(prop) {
		showResult(prop[0]);
	}
}

function showResult(array) {
	if(!array) {
		executeScript();

		return false;
	}

	result.innerHTML = "";
	preloader.classList.add("uk-hidden");

	for(var i = 0; i < 10; i++) {
		result.innerHTML += "<div class='uk-card uk-card-small uk-card-default uk-card-body'>" + array[i].key + ": " + array[i].value + "</div>";
	}
}