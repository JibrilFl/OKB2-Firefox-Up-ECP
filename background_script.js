// Put all the javascript code here, that you want to execute in background.

browser.runtime.onMessage.addListener((m) => {

	if (m.name) {
		browser.tabs
			.query({
				currentWindow: true,
				active: true,
			})
			.then(tabs => sendMessageToTabs(tabs, m))
			.catch(onError);
	} else if (m.del) {
		browser.tabs
			.query({
				currentWindow: true,
				active: true,
			})
			.then(tabs => sendMessageToTabs(tabs, m))
			.catch(onError);
	}
});

function onError(error) {
	console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs, name) {
	for (const tab of tabs) {
		browser.tabs
			.sendMessage(tab.id, {...name})
			.then((response) => {
				console.log("Message from the content script:");
				console.log(response.response);
			})
			.catch(onError);
	}
}