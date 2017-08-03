$(document).ready(function(){
	populateFields();

	$('#click').click(function(){
		var url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,LTC,BTC,XRP,BCH&tsyms=USD';
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
					eth: parseFloat(json['ETH'][usd]),
					xrp: parseFloat(json['XRP'][usd])
				}
				$('#ltc-current-price').text('$' + currentPrices.ltc);
				$('#btc-current-price').text('$' + currentPrices.btc);
				$('#eth-current-price').text('$' + currentPrices.eth);
				$('#xrp-current-price').text('$' + currentPrices.xrp);

				insertProfit(litecoinData(), currentPrices);
				insertProfit(bitcoinData(), currentPrices);
				insertProfit(ethereumData(), currentPrices);
				insertProfit(rippleData(), currentPrices);

				insertTotalGains(totalGains(currentPrices));

				var portfolioValue = portfolioTotal(currentPrices);
				insertPortfolioTotal(portfolioValue);

				var initialInvestment = totalOutOfPocket();
				var percent = (calculatePercent(portfolioValue, initialInvestment)).toFixed(2);
				insertTotalPercentage(percent);
			}
		});
	});

	$('select#coin').change(function(){
		$('input#investment-amount').val('');
		$('span#new-price').text('');
	});

	$('input#investment-amount').keyup(function(){
		calculateNewPrice();
	});
});

function populateFields() {
	var coins = allCoins();
	var length = coins.length;
	var selectField = $('select#coin');

	for (i = 0; i < length; i++) {
		var coin = coins[i];
		insertValues(coin);
		selectField.append($('<option />').val(coin.name).text(coin.name.toUpperCase()));
	}

	insertInitialInvestment();
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
	var moneyDiv = $(table + ' div.split')[0];
	var percentDiv = $(table + ' div.split')[1];


	var change = calculateProfits(coinObject, currentPrices);
	var signMoneyLocation = $(moneyDiv).find('.sign')[0];
	var signPercentLocation = $(percentDiv).find('.sign')[0];
	var moneyLocation = $(moneyDiv).find('.money')[0];
	var percentLocation = $(percentDiv).find('.percent')[0];

	$(signMoneyLocation).text(change.sign);
	$(signPercentLocation).text(change.sign);
	$(moneyLocation).text(Math.abs(change.money));
	$(percentLocation).text(Math.abs(change.percent));
}

function insertInitialInvestment() {
	var total = round(totalOutOfPocket(), 2);
	$('#initial-investment').text(total);	
}

function insertTotalGains(totalGain) {
	$('#total-gains').text(totalGain);
}

function insertPortfolioTotal(portfolioTotal) {
	$('#portfolio-total').text(portfolioTotal);
}

function insertTotalPercentage(totalPercent) {
	$('#total-percent').text(totalPercent);
}

function calculateProfits(coinObject, currentPrices) {
	var currentPrice = currentPrices[coinObject.name];
	var purchasedPrice = coinObject.pricePerCoin;
	var profit = (currentPrice - purchasedPrice).toFixed(2)

	return {
		money: profit,
		percent: calculatePercent(currentPrice, purchasedPrice).toFixed(1),
		sign: getSign(profit)
	}
}

function calculatePercent(cp, pp) {
	if (cp == pp) {
		return 0
	} else {
		return ((cp / pp) - 1) * 100;
	}
}	

function getSign(value) {
	if (value < 0 ) {
		return '-';
	} else if (value > 0 ) {
		return '+';
	} else {
		return '';
	}
}