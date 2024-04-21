function getDownload(req, res) {
    const file = `${__dirname}/CareerSpeak.apk`;
    res.download(file); // Set disposition and send it.
};

export default getDownload;
