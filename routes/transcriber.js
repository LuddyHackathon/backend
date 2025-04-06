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

    let transcribedText;
    let paraphrasedText;

    voiceFile.mv(uploadPath, async function (err) {
        if (err) {
            return res.status(500).send(err);
        };

        const transcriberOptions = {
            hostname: 'transcriber',
            port: 65535,
            path: '/?voice_file=' + encodeURIComponent(voiceFile.name),
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
                console.log('transcriber output:', transcribedText);
                paraphrasedText = responseData;
                paraphrasedText = paraphrasedText.substring(paraphrasedText.indexOf(' '), paraphrasedText.length)
                console.log('paraphraser output:', paraphrasedText);
                res.status(200).json({ 'file': voiceFile.name, 'transcribed': transcribedText, 'paraphrased': paraphrasedText });
            });
        });
        transcriberHttpRequest.on('error', (error) => {
            console.error('Error:', error);
            res.status(500).json({ success: false, error: error.message });
        });
        transcriberHttpRequest.end();
    });
};
