function cookie(id, num, termal) {
	var $onum = $("#num");
	var str = $.cookie("cart");
	var obj = str ? JSON.parse(str) : {}; //用来存商品ID（attr）和添加的数量（value）

	var sum = 0;
	for(var i in obj) {
		sum += obj[i];
	}
	$onum.text(sum);

	obj[id] = obj[id] ? (termal ? num : obj[id] + num) : 1;
	var objToStr = JSON.stringify(obj);
	$.cookie("cart", objToStr, {
		"path": "/",
		"expires": 7
	});
	sum += num;
	$onum.text(sum);
}

function totalNum() {
	var $onum = $("#num");
	var str = $.cookie("cart");
	var obj = str ? JSON.parse(str) : {}; //用来存商品ID（attr）和添加的数量（value）
	var sum = 0;
	for(var i in obj) {
		sum += obj[i];
	}
	$onum.text(sum);
}
totalNum();
