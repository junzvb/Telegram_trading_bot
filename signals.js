const axios = require('axios');

async function getRSI(symbol) {
    const url = `https://www.alphavantage.co/query?function=RSI&symbol=${symbol}&interval=15min&time_period=14&series_type=close&apikey=${process.env.ALPHA_VANTAGE_KEY}`;
    const res = await axios.get(url);
    const values = res.data['Technical Analysis: RSI'];
    if (!values) return null;
    const lastKey = Object.keys(values)[0];
    return parseFloat(values[lastKey].RSI);
}

async function getSignal(symbol) {
    const rsi = await getRSI(symbol);
    if (rsi === null) return null;
    if (rsi < 30) return 'BUY';
    if (rsi > 70) return 'SELL';
    return 'HOLD';
}

module.exports = { getSignal };
