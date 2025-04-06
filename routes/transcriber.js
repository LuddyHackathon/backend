import http from 'http';

export function getTranscriber(req, res) {
    res.render('index.html', { status: 'good' });
};

export function postTranscriber(req, res) {
    let voiceFile = req.query.voiceFile;

    let transcribedText;

    voiceFile.mv(uploadPath, async function (err) {
        if (err) {
            return res.status(500).send(err);
        };

        const transcriberOptions = {
            hostname: 'transcriber',
            port: 65535,
            path: '/?voice_file=' + encodeURIComponent(voiceFile),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const transcriberHttpRequest = http.request(transcriberOptions, (response) => {
            let responseData = '';

            response.on('data', (chunk) => {
                responseData += chunk;
            });

            response.on('end', () => {
                transcribedText = responseData;
                res.status(200).json({ 'file': voiceFile.name, 'transcribed': transcribedText });

            });
            transcriberHttpRequest.on('error', (error) => {
                console.error('Error:', error);
                res.status(500).json({ success: false, error: error.message });
            });
            transcriberHttpRequest.end();
        });
    });
};
