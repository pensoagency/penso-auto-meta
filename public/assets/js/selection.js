chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getSelection"){
	  if(window.getSelection().toString()){
		  sendResponse({data: window.getSelection().toString()});
	  }else{
		  var body = document.body,
			  textContent = body.textContent || body.innerText;
		  sendResponse({data: textContent});
	  };
  }
  else{
	  sendResponse({}); // snub them.
  }
});

