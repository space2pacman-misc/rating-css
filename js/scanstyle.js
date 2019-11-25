function scanStyles(notInclude) {
	var styleSheets = document.styleSheets;
	var rules = {};
	var hrefs = [];
	var notInclude = notInclude || [];
	var keys;
	var prop;
	var styles;

	for(var i = 0; i < styleSheets.length; i++) {
		deepFind(styleSheets[i])
	}

	function deepFind(styleSheets) {
		// try catch нужен так как иногда попадаются cssRules без стилей
		// там хранится шрифт и такие случаи обрабатывать не нужно но нужно продолжить выполнение скрипта
		try {

			for(var j = 0; j < styleSheets.cssRules.length; j++) {
				// Пропустисть сканирование файла со стилями если он есть в этом массиве
				if(notInclude.includes(styleSheets.href)) continue;

				// Если есть ссылка то отдельно из собираем
				if(styleSheets.href) {
					if(!hrefs.includes(styleSheets.href)) {
						hrefs.push(styleSheets.href);
					}
				}
				// Если внутри присутствуют еще cssRules то сканируем и их
				if(styleSheets.cssRules[j].cssRules) {
					deepFind(styleSheets.cssRules[j])
					continue;
				}

				styles = styleSheets.cssRules[j].style;
				keys = Object.keys(styles);
				keys = keys.filter(i => Number(i) || Number(i) == 0);

				// Перебираем все найденные свойства и набиваем объект rules
				for(var k = 0; k < keys.length; k++) {
					prop = styles[keys[k]];
					
					if(rules[prop]) {
						rules[prop]++;
					} else {
						rules[prop] = 1;
					}
				}
			}
		} catch {

		}
	}

	function sortObject(obj) {
		var array = [];

		for(key in obj) {
			array.push({key: key, value: obj[key]});
		}

		array = array.sort((a, b) => b.value - a.value);

		return array;
	}
	
	return sortObject(rules);
};