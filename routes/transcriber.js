import http from 'http';

export function getTranscriber(req, res) {
    res.render('index.html', { status: 'good' });
};

export function postTranscriber(req, res) {
    let voiceFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    };

    voiceFile = req.files.voiceFile;
    uploadPath = '/voice/' + voiceFile.name;

    voiceFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send(err);
        };
        const options = {
            hostname: 'transcriber',
            port: 65535,
            path: '/?file=' + encodeURIComponent(req.query.file),
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
    });
};
