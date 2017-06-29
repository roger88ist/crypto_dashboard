function calculateNewPrice() {
	var coin = $('select#coin').val();
	var investmentAmount = $('input#investment-amount').val();

	switch (coin) {
		case 'ltc':
			coin = litecoinData();
			break;
		case 'btc':
			coin = bitcoinData();
			break;
		case 'eth':
			coin = ethereumData();
			break;
		case 'xrp':
			coin = rippleData();
			break;
		default:
			coin = false;
	}
	
	if (coin) {
		var priceLocation = 'span#' + coin.name + '-current-price';
		var currentPrice = $(priceLocation).text().replace('$','');

		var newAmountOfCoins = investmentAmount / currentPrice;
		var totalCoins = newAmountOfCoins + coin.coins;
		var totalDollars = parseFloat(investmentAmount) + coin.totalDollars;
		
		if (coin.name == 'xrp') {
			var newCoinPrice = round(totalDollars / totalCoins, 4);
		} else {
			var newCoinPrice = round(totalDollars / totalCoins, 2);
		}

		console.log(newCoinPrice);
	}
	

}