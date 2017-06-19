$(document).ready(function(){
	populateFields();
	populateProfits();

	$('#click').click(function(){
		var url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,LTC,BTC&tsyms=USD';
		var usd = 'USD';
		jQuery.ajax({
			type: 'GET',
			url: url,
			dataType: 'json',
			contentType: 'application/json',
			success: function(json) {
				var currentPrices = { 
					ltc: parseFloat(json['LTC'][usd]),
					btc: parseFloat(json['BTC'][usd]),
					eth: parseFloat(json['ETH'][usd]) 
				}
				$('#ltc-current-price').text('$' + currentPrices.ltc);
				$('#btc-current-price').text('$' + currentPrices.btc);
				$('#eth-current-price').text('$' + currentPrices.eth);

				insertProfit(litecoinData(), currentPrices);
				insertProfit(bitcoinData(), currentPrices);
				insertProfit(ethereumData(), currentPrices);
			}
		});
	});
});



function populateFields() {
	var ltc = litecoinData();
	var eth = ethereumData();
	var btc = bitcoinData();


	insertValues(ltc);
	insertValues(eth);
	insertValues(btc);
}

function populateProfits() {
	var ltc = litecoinData();
	var eth = ethereumData();
	var btc = bitcoinData();	

	insertProfit(ltc, currentPrices());
	insertProfit(eth, currentPrices());
	insertProfit(btc, currentPrices());
}

function insertValues(coinObject) {
	var table = 'table#' + coinObject.name;
	var coinsLocation = $(table + ' td')[0];
	var priceLocation = $(table + ' td')[1];

	$(coinsLocation).text(coinObject.coins);
	$(priceLocation).text(coinObject.pricePerCoin);
}

function insertProfit(coinObject, currentPrices) {
	var table = 'table#' + coinObject.name;
	var moneyLocation = $(table + ' div.split')[0];
	var percentLocation = $(table + ' div.split')[1];


	var change = calculateProfits(coinObject, currentPrices);


	$(moneyLocation).text(change.money);
	$(percentLocation).text(change.percent);
}

function calculateProfits(coinObject, currentPrices) {
	var currentPrice = currentPrices[coinObject.name];
	var purchasedPrice = coinObject.pricePerCoin;

	return {
		money: (currentPrice - purchasedPrice).toFixed(2),
		percent: calculatePercent(currentPrice, purchasedPrice).toFixed(1)
	}
}

function calculatePercent(cp, pp) {
	if (cp == pp) {
		return 0
	} else {
		return ((cp / pp) - 1) * 100;
	}
}

function currentPrices() {
	return {
		ltc: 10,
		eth: 300,
		btc: 2500
	}
}