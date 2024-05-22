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
    uploadPath = voiceFile.name;

    voiceFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send(err);
        };
        res.send('File uploaded!');
    });
};
