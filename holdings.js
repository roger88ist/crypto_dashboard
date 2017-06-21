function investmentObject(name, initialInvestment, totalCoins, outOfPocket) {
	return {
		name: name,
		totalDollars: initialInvestment,
		coins: totalCoins,
		pricePerCoin: round((initialInvestment / totalCoins), 2),
		outOfPocket: outOfPocket
	};
}

function litecoinData() {
	var investmentAmount = 893.39;
	var totalCoins = 25;
	var outOfPocket = 893.39;
	return investmentObject('ltc', investmentAmount, totalCoins, outOfPocket);
}

function bitcoinData() {
	var investmentAmount = 1014.90;
	var totalCoins = 0.51;
	var outOfPocket = 1014.90;
	return investmentObject('btc', investmentAmount, totalCoins, outOfPocket);
}

function ethereumData() {
	var investmentAmount = 269.76;
	var totalCoins = 1;
	var outOfPocket = 269.76;
	return investmentObject('eth', investmentAmount, totalCoins, outOfPocket);
}

function rippleData() {
	var investmentAmount = ;
	var totalCoins = ;
	var outOfPocket = ;
	return investmentObject('eth', investmentAmount, totalCoins, outOfPocket);
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function totalOutOfPocket() {
	var total = 0;
	var coins =  allCoins();

	for (i = 0; i < coins.length; i++) {
		total += coins[i].outOfPocket;
	}
	return total;
}

function totalGains(currentPrices) {
	var gains = 0;
	var coins =  allCoins();
	for (i = 0; i < coins.length; i++) {
		var coin = coins[i];
		var coinAmount = coin.coins;
		var currrentTotal = currentPrices[coin.name] * coinAmount;
		gains += (currrentTotal - coin.outOfPocket);
	}
	return gains.toFixed(2);
}

function portfolioTotal(currentPrices) {
	var total = 0;
	var coins =  allCoins();
	for (i = 0; i < coins.length; i++) {
		var coin = coins[i];
		total += currentPrices[coin.name] * coin.coins
	}
	return total.toFixed(2);
}

function allCoins() {
	return [litecoinData(), bitcoinData(), ethereumData(), rippleData()];
}