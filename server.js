const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get('/api/quotes/random', (req, res) => {
    const quote = { quote: getRandomElement(quotes) };
    res.send(quote);
});

app.get('/api/quotes', (req, res) => {
    if (req.query.person) {
        const person = req.query.person,
        filteredQuotes = { quotes: quotes.filter(quote => quote.person === person) };
        res.send(filteredQuotes);
    }
    else {
        res.send({quotes});
    };
});

app.post('/api/quotes', (req, res) => {
    if (req.query.quote && req.query.person) {
        const quote = req.query.quote,
        person = req.query.person,
        newQuote = { quote, person };
        quotes.push(newQuote);
        res.send({ quote: newQuote });
    }
    else {
        res.status(400).send('Bad Request');
    }
});