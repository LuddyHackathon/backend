const express = require('express');
const http = require('http');

const app = express();
const port = 65535;

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from('<h2>Working!</h2>'));
})

app.get('/grammar', (req, res) => {
    const options = {
        hostname: 'grammar',
        port: 65535,
        path: '/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const httpRequest = http.request(options, (response) => {
        let responseData = '';

        response.on('data', (chunk) => {
            responseData += chunk;
        });

        response.on('end', () => {
            res.send(responseData)
        });
    });

    httpRequest.on('error', (error) => {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    });

    httpRequest.end();
})

app.post('/grammar', (req, res) => {
    const options = {
        hostname: 'grammar',
        port: 65535,
        path: '/?file=' + encodeURIComponent(req.query.file),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const httpRequest = http.request(options, (response) => {
        let responseData = '';

        response.on('data', (chunk) => {
            responseData += chunk;
        });

        response.on('end', () => {
            res.send(responseData)
        });
    });

    httpRequest.on('error', (error) => {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    });

    httpRequest.end();
})

app.get('/recommender', (req, res) => {
    const options = {
        hostname: 'recommender',
        port: 65535,
        path: '/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const httpRequest = http.request(options, (response) => {
        let responseData = '';

        response.on('data', (chunk) => {
            responseData += chunk;
        });

        response.on('end', () => {
            res.send(responseData)
        });
    });

    httpRequest.on('error', (error) => {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    });

    httpRequest.end();
})

app.post('/recommender', (req, res) => {
    const options = {
        hostname: 'recommender',
        port: 65535,
        path: '/?text=' + encodeURIComponent(req.query.text),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const httpRequest = http.request(options, (response) => {
        let responseData = '';

        response.on('data', (chunk) => {
            responseData += chunk;
        });

        response.on('end', () => {
            res.send(responseData)
        });
    });

    httpRequest.on('error', (error) => {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    });

    httpRequest.end();
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
