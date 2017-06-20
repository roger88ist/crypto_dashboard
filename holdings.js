function investmentObject(name, initialInvestment, totalCoins) {
	return {
		name: name,
		totalDollars: initialInvestment,
		coins: totalCoins,
		pricePerCoin: round((initialInvestment / totalCoins), 2)
	};
}

function litecoinData() {
	var investmentAmount = // Enter Total Purchase Amount
	var totalCoins = // Enter Total Coins Purchased
	return investmentObject('ltc', investmentAmount, totalCoins);
}

function bitcoinData() {
	var investmentAmount = // Enter Total Purchase Amount
	var totalCoins = // Enter Total Coins Purchased
	return investmentObject('btc', investmentAmount, totalCoins);
}

function ethereumData() {
	var investmentAmount = // Enter Total Purchase Amount
	var totalCoins = // Enter Total Coins Purchased
	return investmentObject('eth', investmentAmount, totalCoins);
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function totalInvestment() {
	var total = 0;
	var coins =  allCoins();

	for (i = 0; i < coins.length; i++) {
		total += coins[i].totalDollars;
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
		gains += (currrentTotal - coin.totalDollars);
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
	return [litecoinData(), bitcoinData(), ethereumData()];
}