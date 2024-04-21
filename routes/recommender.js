import http from 'http';

export function getRecommender(req, res) {
    const options = {
        hostname: 'recommender',
        port: 65535,
        path: '/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const httpRequest = http.request(options, (response) => {
        let responseData = '';

        response.on('data', (chunk) => {
            responseData += chunk;
        });

        response.on('end', () => {
            res.send(responseData);
        });
    });

    httpRequest.on('error', (error) => {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    });

    httpRequest.end();
};

export function postRecommender(req, res) {
    const options = {
        hostname: 'recommender',
        port: 65535,
        path: '/?text=' + encodeURIComponent(req.body.text),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const httpRequest = http.request(options, (response) => {
        let responseData = '';

        response.on('data', (chunk) => {
            responseData += chunk;
        });

        response.on('end', () => {
            res.send(responseData);
        });
    });

    httpRequest.on('error', (error) => {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    });

    httpRequest.end();
}
