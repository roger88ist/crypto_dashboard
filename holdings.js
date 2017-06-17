function investmentObject(name, initialInvestment, totalCoins) {
	return {
		name: name,
		totalDollars: initialInvestment,
		coins: totalCoins,
		pricePerCoin: round((initialInvestment / totalCoins), 2)
	};
}

function litecoinData() {
	return investmentObject('ltc', 445.72, 15);
}

function bitcoinData() {
	return investmentObject('btc', 1014.90, 0.51);	
}

function ethereumData() {
	return investmentObject('eth', 268.76, 1);	
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}