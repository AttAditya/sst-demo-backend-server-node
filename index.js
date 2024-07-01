const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');

    switch (req.url) {
        case "/": {
            res.write(fs.readFileSync("index.html"));
            break;
        }
        case "/login": {
            res.write(`
                <html>
                    <head>
                        <title>Node JS Class</title>
                    </head>
                    <body>
                        <h1>Hello Login</h1>
                        <a href="/">Home Page</a>
                    </body>
                </html>
            `);

            break;
        }
        default: {
            res.write(`
                <html>
                    <head>
                        <title>Node JS Class</title>
                    </head>
                    <body>
                        <h1>404</h1>
                        <a href="/">Index Page</a>
                        <a href="/login">Login Page</a>
                    </body>
                </html>
            `);
        }
    }

    res.end();
});

const PORT = 3000;
const HOST = 'localhost';

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}/`);
});

