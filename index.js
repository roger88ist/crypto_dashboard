$(document).ready(function(){
	populateFields()
});



function populateFields() {
	var ltc = litecoinData();
	var eth = ethereumData();
	var btc = bitcoinData();


	insertValues(ltc);
	insertValues(eth);
	insertValues(btc);
}

function insertValues(coinObject) {
	var table = 'table#' + coinObject.name;
	var coinsLocation = $(table + ' td')[0];
	var priceLocation = $(table + ' td')[1];

	$(coinsLocation).text(coinObject.coins);
	$(priceLocation).text(coinObject.pricePerCoin);
}