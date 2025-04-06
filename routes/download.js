function getDownload(req, res) {
    const file = `${__dirname}/CareerSpeak.apk`;
    res.download(file);
};

export default getDownload;
