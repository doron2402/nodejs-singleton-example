const { createServer } = require('http');
const singletonObj = require('./singleton_obj');
const Singleton = require('./singleton_class');

const PORT = process.env.PORT || 3001;

const setResponseHeaders = (res) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Vary', 'Origin');
}

const getRandomNumber = () => parseInt(Math.random() * 10000);

createServer(function (req, res) {
    // settings headers
    setResponseHeaders(res);
    console.log(`Incoming request [${req.method}] ${req.url}`);
    
    if (req.url.toLowerCase() === '/set/object' && req.method.toLowerCase() === 'get') {
        singletonObj.status = getRandomNumber();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(`{ "code": "ok", "message": "${singletonObj.status}" }`);
        return res.end();
    }
    else if (req.url.toLowerCase() === '/get/object' && req.method.toLowerCase() === 'get') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(`{ "code": "ok", "object": ${singletonObj.status}, "class": "${instance.getStatus()}" }`);
        return res.end();
    }
    else if (req.url.toLowerCase() === '/get/class') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        const instance = new Singleton();
        res.write(`{ "code": "ok", "object": ${singletonObj.status}, "class": "${instance.getStatus()}" }`);
        return res.end();
        
    }
    else if (req.url.toLowerCase() === '/set/class') {
        const instance = new Singleton();
        instance.setStatus(getRandomNumber());
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(`{ "code": "ok", "message": "${instance.getStatus()}" }`);
        return res.end();
    }
    else if (req.url.toLowerCase() === '/get') {
        const instance = new Singleton();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(`{ "code": "ok", "object": ${singletonObj.status}, "class": "${instance.getStatus()}" }`);
        return res.end();
    }
    else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.write('{ "code": "ok", "message": "NotFound" }');
        return res.end();
    }
  }).listen(PORT, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Server is running ${PORT}`);
  });