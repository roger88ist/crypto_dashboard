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