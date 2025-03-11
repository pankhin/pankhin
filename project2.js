const express = require('express');
const request = require('request');
const app = express();
const http = require('http');
const convert = require('xml-js');
const port = 3000;

// Move sensitive keys to environment variables
const client_id = process.env.NAVER_CLIENT_ID;
const client_secret = process.env.NAVER_CLIENT_SECRET;
const hospital_api_key = process.env.HOSPITAL_API_KEY;
const HOST = 'http://apis.data.go.kr/6260000/MedicInstitService/MedicalInstitInfo';

app.use(express.static('project'));

app.get('/webapii', (req, res) => {
    const query = encodeURIComponent(req.query.query);
    let url = 'https://openapi.naver.com/v1/search/blog.json';
    url += `?query=${query}&display=12`;

    const options = {
        url: url,
        headers: {
            'X-Naver-Client-Id': client_id,
            'X-Naver-Client-Secret': client_secret
        }
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(body);
            res.send(body);
        }
    });
});

app.get('/hospitalapi', (req, res) => {
    const { query, type } = req.query;
    const encodedQuery = encodeURIComponent(query);
    const searchField = type === 'address' ? 'street_nm_addr' : type === 'institution' ? 'instit_nm' : 'instit_kind';
    const url = `${HOST}?serviceKey=${hospital_api_key}&${searchField}=${encodedQuery}`;

    console.log(`Request URL: ${url}`);

    http.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            try {
                const result = convert.xml2js(data, { compact: true, spaces: 2 });
                console.log('API response:', result);
                res.status(200).json(result);
            } catch (error) {
                console.error('Error parsing XML:', error);
                res.status(500).send('Internal Server Error');
            }
        });
    }).on('error', (err) => {
        console.error(`Error: ${err}`);
        res.status(500).send('Internal Server Error');
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
