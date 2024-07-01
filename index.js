const http = require('http');
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');

    if (req.url === "/login") {
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
    } else {
        res.write(`
            <html>
                <head>
                    <title>Node JS Class</title>
                </head>
                <body>
                    <h1>Hello World</h1>
                    <a href="/login">Login Page</a>
                </body>
            </html>
        `);
    }

    res.end();
});

const PORT = 3000;
const HOST = 'localhost';

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}/`);
});

