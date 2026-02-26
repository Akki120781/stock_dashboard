const axios = require('axios');

const TWELVE_DATA_URL = 'https://api.twelvedata.com';

// In-memory cache
const quoteCache = new Map();
const historyCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// @desc    Get stock quote
// @route   GET /api/stocks/quote/:symbol
// @access  Private
const getStockQuote = async (req, res) => {
    try {
        const symbol = req.params.symbol.toUpperCase();
        const apiKey = process.env.STOCK_API_KEY;

        const cached = quoteCache.get(symbol);
        if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
            console.log(`Serving quote for ${symbol} from cache`);
            return res.json(cached.data);
        }

        const response = await axios.get(`${TWELVE_DATA_URL}/quote?symbol=${symbol}&apikey=${apiKey}`);

        if (response.data && response.data.symbol) {
            const quote = response.data;

            const quoteData = {
                symbol,
                currentPrice: parseFloat(quote.close),
                high: parseFloat(quote.high),
                low: parseFloat(quote.low),
                previousClose: parseFloat(quote.previous_close),
                percentageChange: parseFloat(quote.percent_change),
                change: parseFloat(quote.change),
            };

            quoteCache.set(symbol, { data: quoteData, timestamp: Date.now() });
            res.json(quoteData);
        } else {
            // Check if it's a rate limit error from Twelve Data (code 429)
            if (response.data && response.data.code === 429 && cached) {
                console.log(`Rate limit reached, serving stale cached quote for ${symbol}`);
                return res.json(cached.data);
            }
            res.status(429).json({ message: response.data.message || 'Stock not found or API rate limit reached' });
        }
    } catch (error) {
        console.error("Quote API Error:", error.message);
        const symbol = req.params.symbol.toUpperCase();
        const cached = quoteCache.get(symbol);
        if (cached) {
            return res.json(cached.data);
        }
        res.status(500).json({ message: 'Error fetching stock quote' });
    }
};

// @desc    Get historical stock data (last 30 days)
// @route   GET /api/stocks/history/:symbol
// @access  Private
const getStockHistory = async (req, res) => {
    try {
        const symbol = req.params.symbol.toUpperCase();
        const apiKey = process.env.STOCK_API_KEY;

        const cached = historyCache.get(symbol);
        if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
            console.log(`Serving history for ${symbol} from cache`);
            return res.json(cached.data);
        }

        const response = await axios.get(
            `${TWELVE_DATA_URL}/time_series?symbol=${symbol}&interval=1day&outputsize=30&apikey=${apiKey}`
        );

        if (response.data && response.data.values) {
            const timeSeries = response.data.values;

            const historicalData = timeSeries.map((item) => {
                return {
                    date: new Date(item.datetime).toLocaleDateString(),
                    price: parseFloat(item.close),
                };
            }).reverse();

            historyCache.set(symbol, { data: historicalData, timestamp: Date.now() });
            res.json(historicalData);
        } else {
            if (response.data && response.data.code === 429 && cached) {
                console.log(`Rate limit reached, serving stale cached history for ${symbol}`);
                return res.json(cached.data);
            }
            res.status(429).json({ message: response.data.message || 'No historical data found or API rate limit reached' });
        }
    } catch (error) {
        console.error("History API Error:", error.message);
        const symbol = req.params.symbol.toUpperCase();
        const cached = historyCache.get(symbol);
        if (cached) {
            return res.json(cached.data);
        }
        res.status(500).json({ message: 'Error fetching stock history' });
    }
};

module.exports = {
    getStockQuote,
    getStockHistory,
};
