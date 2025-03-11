const convert = require('xml-js');
const express = require('express');
const request = require('request');
const path = require('path');

const app = express();
const port = 3000;

const client_id = 'NleknZs1rK6olI61Ljzr';
const client_secret = '7lJ0mzreYY';
const hospital_api_key = '9WVV%2FmMsoKbkDX4s%2FMXMfgotMxLJKEVTI2IIJoJNKsGQ7oXcQWg9ftICMaRL7RWO00DBSLeSwFvDFD73TeSPfw%3D%3D';
const HOST = 'http://apis.data.go.kr/6260000/MedicInstitService/MedicalInstitInfo';

// Serve static files from the 'project' directory
app.use(express.static(path.join(__dirname, 'project')));

// Route to handle search requests
app.get('/webapii', function (req, res) {
    const query = encodeURIComponent(req.query.query);
    let url = `https://openapi.naver.com/v1/search/blog.json`;  // Changed const to let

    url = url + "?query=" + query + "&display=12";

    const options = {
        headers: {
            'X-Naver-Client-Id': client_id,
            'X-Naver-Client-Secret': client_secret,
        },
        method: 'GET',
        url: url
    };

    request(options, function (error, response, body) {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        } else {
            console.log(body);
            res.send(body);
        }
    });
});

// Route to handle hospital information requests
app.get('/hospitalapi', function (req, res) {
    const { query, type } = req.query;
    const encodedQuery = encodeURIComponent(query);
    const searchField = type === 'address' ? 'street_nm_addr' : type === 'institution' ? 'instit_nm' : 'instit_kind';
    const url = `${HOST}?serviceKey=${hospital_api_key}&${searchField}=${encodedQuery}`;

    console.log(`Request URL: ${url}`);

    const options = {
        maxBodyLength: Infinity,
        method: 'GET',
        url: url
    };

    request(options, function (error, response, body) {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            const result = convert.xml2js(body, { compact: true, spaces: 2 });
            console.log('API response:', result);
            res.status(200).json(result);
        }
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
