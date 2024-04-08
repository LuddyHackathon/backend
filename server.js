const express = require('express');
const http = require('http');
const fileUpload = require('express-fileupload');

const app = express();
const port = 65535;

var engines = require('consolidate');

app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(fileUpload());

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

app.get('/data', (req, res) => {
    res.render('index.html',{status:'good'});
})

app.post('/data', function(req, res) {
    let resumeFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "resumeFile") is used to retrieve the uploaded file
    resumeFile = req.files.resumeFile;
    uploadPath = __dirname + '/resume/' + resumeFile.name;

    // Use the mv() method to place the file somewhere on your server
    resumeFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);

      res.send('File uploaded!');
    });
  });

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
