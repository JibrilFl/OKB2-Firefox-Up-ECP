document.querySelector('.btn_1').addEventListener('click', function() {

	let name = document.querySelector('#in').value.toLowerCase();

	if (name === '' || name.trim() === '' || name.search(/\d/) !== -1) {
		return
	}

	browser.runtime.sendMessage({name});
});

document.querySelector('.btn_2').addEventListener('click', function() {

	browser.runtime.sendMessage({del: 'true'});
});

browser.browserAction.onClicked.addListener(() => {
	console.log(localStorage.getItem('name'));
})
