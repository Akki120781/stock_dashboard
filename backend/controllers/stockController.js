const axios = require('axios');

const ALPHA_VANTAGE_URL = 'https://www.alphavantage.co/query';

// @desc    Get stock quote
// @route   GET /api/stocks/quote/:symbol
// @access  Private
const getStockQuote = async (req, res) => {
    try {
        const symbol = req.params.symbol.toUpperCase();
        const apiKey = process.env.STOCK_API_KEY;

        const response = await axios.get(`${ALPHA_VANTAGE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);

        if (response.data && response.data['Global Quote'] && Object.keys(response.data['Global Quote']).length > 0) {
            const quote = response.data['Global Quote'];

            res.json({
                symbol,
                currentPrice: parseFloat(quote['05. price']),
                high: parseFloat(quote['03. high']),
                low: parseFloat(quote['04. low']),
                previousClose: parseFloat(quote['08. previous close']),
                percentageChange: parseFloat(quote['10. change percent'].replace('%', '')),
                change: parseFloat(quote['09. change']),
            });
        } else {
            res.status(404).json({ message: 'Stock not found or invalid API key / Rate limit reached' });
        }
    } catch (error) {
        console.error(error);
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

        const response = await axios.get(
            `${ALPHA_VANTAGE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${apiKey}`
        );

        if (response.data && response.data['Time Series (Daily)']) {
            const timeSeries = response.data['Time Series (Daily)'];
            // Alpha Vantage returns a dict keyed by date ("YYYY-MM-DD"). We need to map this to an array.

            const historicalData = Object.keys(timeSeries)
                .slice(0, 30) // Get the last 30 trading days
                .map((dateStr) => {
                    return {
                        date: new Date(dateStr).toLocaleDateString(),
                        price: parseFloat(timeSeries[dateStr]['4. close']),
                    };
                })
                .reverse(); // Standardize chronological order for chart

            res.json(historicalData);
        } else {
            res.status(404).json({ message: 'No historical data found or API rate limit reached' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching stock history' });
    }
};

module.exports = {
    getStockQuote,
    getStockHistory,
};
