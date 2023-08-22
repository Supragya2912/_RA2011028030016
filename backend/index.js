const express = require('express');
const http = require('http');
const axios = require('axios');

const app = express();

const isURLValid = (url) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      const domainPart = url.slice(url.indexOf("://") + 3);
      
      if (domainPart.includes(".")) {
        return true;
      }
    }
    
    return false;
}

const callApi = (url) => {
    return axios.get(url, {
        timeout: 500
    }).then(res => {
        return res.data.numbers
    }).catch(e => {
        console.log(e);
        return []
    })
}

app.get('/numbers', async (req, res) => {
    const url = req.query.url;

    let urls = []

    if (typeof url === 'string') {
        urls.push(url);
    } else if (Array.isArray(url)) {
        urls = url;
    }

    urls = urls.filter(url => isURLValid(url));

    const responses = await Promise.all(urls.map(url => callApi(url)));

    const numbersSet = new Set();

    for (const numbersList of responses) {
        for (const number of numbersList) {
            numbersSet.add(number);
        }
    }

    const numbersArray = Array.from(numbersSet).sort((a, b) => a-b);

    res.json(numbersArray);
});

const server = http.createServer(app).listen(8008, () => {
    console.log(
      `Server started on port 8008`,
    );
});
