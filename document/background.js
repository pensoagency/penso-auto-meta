chrome.contextMenus.create({
	title: "PENSO Auto Meta",
	contexts: ["page", "selection", "link", "editable", "image", "video", "audio"],
	onclick: function() {

		//chrome.tabs.executeScript(null, {file: "popup.js"});
		chrome.tabs.create({ url: evt.pageUrl })

	}
});


//chrome.tabs.executeScript({
//	code: 'document.body.style.backgroundColor="red"'
//});