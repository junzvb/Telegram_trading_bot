require('dotenv').config();
const cron = require('node-cron');
const { sendAlert } = require('./bot');
const { getSignal } = require('./signals');

const symbols = ['AAPL', 'TSLA', 'GOOGL', 'XAUUSD', 'XAGUSD', 'BTCUSD'];

cron.schedule('*/30 * * * *', async () => {
    console.log('Running trading scan...');
    for (let symbol of symbols) {
        const signal = await getSignal(symbol);
        if (signal && signal !== 'HOLD') {
            let message;
            if (symbol === 'XAUUSD') message = `💰 ${signal} Signal for Gold (XAU/USD)`;
            else if (symbol === 'XAGUSD') message = `💎 ${signal} Signal for Silver (XAG/USD)`;
            else if (symbol === 'BTCUSD') message = `₿ ${signal} Signal for Bitcoin (BTC/USD)`;
            else message = `🚨 ${signal} Signal for ${symbol}`;
            await sendAlert(message);
            console.log(`Sent alert: ${message}`);
        }
    }
});
