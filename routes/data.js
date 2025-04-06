export function getData(req, res) {
    res.render('index.html', { status: 'good' });
};

export function postData(req, res) {
    let voiceFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    };

    // The name of the input field (i.e. "resumeFile") is used to retrieve the uploaded file
    voiceFile = req.files.voiceFile;
    uploadPath = '/voice/' + voiceFile.name;

    // Use the mv() method to place the file somewhere on your server
    voiceFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send(err);
        };
        res.send('File uploaded!');
    });
};