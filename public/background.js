chrome.contextMenus.create({
	title: "Auto Meta",
	contexts: ["selection"],
	onclick: function() {

		chrome.tabs.executeScript(null, {file: "popup.js"});

	}
});


//chrome.tabs.executeScript({
//	code: 'document.body.style.backgroundColor="red"'
//});