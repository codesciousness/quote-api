const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, getIndexElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res) => {
    const quote = { quote: getRandomElement(quotes) };
    res.send(quote);
});

app.get('/api/quotes', (req, res) => {
    const person = req.query.person;
    if (person) {
        filteredQuotes = { quotes: quotes.filter(quote => quote.person === person) };
        res.send(filteredQuotes);
    }
    else {
        res.send({quotes});
    };
});

app.post('/api/quotes', (req, res) => {
    const quote = req.query.quote,
        person = req.query.person,
        year = Number(req.query.year),
        id = quotes.length + 1;
    if (quote && person && year) {
        const newQuote = { id, quote, person, year };
        quotes.push(newQuote);
        res.send({ quote: newQuote });
    }
    else {
        res.status(400).send('Bad Request');
    }
});

app.put('/api/quotes/:id', (req, res) => {
    const quoteId = Number(req.params.id),
        quote = req.query.quote,
        person = req.query.person,
        year = Number(req.query.year),
        index = getIndexElement(quotes, quoteId);
    if (quote && person && year && index > -1) {
        const updatedQuote = quotes[index];
        updatedQuote.quote = quote;
        updatedQuote.person = person;
        updatedQuote.year = year;
        res.send(updatedQuote);
    }
    else {
        res.status(404).send('Not Found');
    }
});

app.delete('/api/quotes/:id', (req, res) => {
    const quoteId = Number(req.params.id),
        index = getIndexElement(quotes, quoteId);
    if (index > -1) {
        quotes.splice(index, 1);
        res.status(204).send();
    }
    else {
        res.status(404).send('Not Found');
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});