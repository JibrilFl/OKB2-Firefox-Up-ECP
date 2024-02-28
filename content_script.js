// Put all the javascript code here, that you want to execute after page load.

HTMLElement.prototype.getNodesByText = function (text) {
	const expr = `.//*[text()[contains(
    translate(.,
      'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
      'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя'
    ),
    '${text.toLowerCase()}'
  )]]`;    /* коммент-костыль */
	const nodeSet = document.evaluate(expr, this, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	return Array.from({ length: nodeSet.snapshotLength },
		(v, i) => nodeSet.snapshotItem(i)
	);
};

function searchEmployee(name) {
	const int_2 = setInterval(() => {
		try {
			setTimeout(() => {
				if (document.body.getNodesByText(name).map(el => {return el.parentElement.parentElement.parentElement}).length !== 0) {
					let st = document.body.getNodesByText(name).map(el => {return el.parentElement.parentElement.parentElement});
					let ser = '[value=' + `"${st[st.length - 1].getAttribute('value')}"` + ']';
					console.log(ser);
					if (document.querySelector(ser)) {
						console.log(document.querySelector(ser));
						document.querySelector('.sign_footer .cmbb-button').click();
						document.querySelector(ser).click();
						console.log(document.querySelector('.sign_footer .cmbb-button'));
						clearInterval(int_2);
					}
				}
			}, 50);
		} catch (e) {
			console.log(e);
		}
	}, 1500);
}

function events(e, name) {

	console.log(e.target)

	if (e.target == document.querySelector('.docs_subform > table .btnc')) {
		console.log(name, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
		searchEmployee(name);
	}
}

console.log('Запуск расширения')

if (localStorage.getItem('name')) {
	document.addEventListener('click', (e) => events(e, localStorage.getItem('name')));
}

browser.runtime.onMessage.addListener((req) => {

	if (req.name) {
		if (!localStorage.getItem("name")) {
			localStorage.setItem("name", req.name);
			document.addEventListener('click', (e) => events(e, localStorage.getItem("name")));
			return Promise.resolve({ response: `Записанно имя ${req.name}`});
		} else if (localStorage.getItem("name") !== req.name) {
			localStorage.removeItem("name");
			localStorage.setItem("name", req.name);
			location.reload();
			document.addEventListener('click', (e) => events(e, localStorage.getItem("name")));
			return Promise.resolve({ response: `Имя перезаписанно на ${req.name}`});
		} else if (localStorage.getItem("name") === req.name) {
			return Promise.resolve({ response: `Это имя и так используется`});
		}
	} else if (req.del) {
		if (localStorage.getItem("name")) {
			location.reload();
			localStorage.removeItem("name");
			return Promise.resolve({ response: `Удаление локального хранилища`});
		} else {
			return Promise.resolve({ response: `Локальное хранилище пусто`});
		}
	}



	return Promise.resolve({ response: "Content script передает привет" });
});