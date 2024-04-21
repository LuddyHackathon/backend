function getRoot(req, res) {
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from('<h2>Working!</h2>'));
};

export default getRoot;
