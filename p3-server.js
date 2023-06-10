
// import fs and fastify packages into constant variables
const fs = require('fs');
const fastify = require('fastify')();

// import coinCount function from the p3-module.js code module file
const p3module = require('./p3-modules.js');
// creat constant variable that uses the function coinCount from our imported code module
//const coinCount = p3module.coinCount;
//console.log(coinCount({denom: 5, count: 3}));


// GET default route that reads and returns contents of index.html using readFile() function from the fs package
    // using an arrow function as the callback allows reply/request functionality
fastify.get("/", (request, reply) => {
    // function readfile() from fs package returns an error if error, returns data from index.html
    fs.readFile(`${__dirname}/index.html`, (error, data) => {
        
        if (error) {
            console.log(error);
            return reply.statusCode = 500;
        } else {
            reply
                .header('Content-type', 'text/html; charset=utf-8')
                .send(data);
            reply.statusCode = 200;
        }
    }); // Note: include reply.send(data(of index.html)); within the function readfile() to correctly interpret the data
});

// coin route with GET verb
    // handle two query parameters that are involved with the coinCount function: denom and count
    // return coinValue, status code, header and template string literal
fastify.get("/coin", (request, reply) => {
        let {denom=0, count=0} = request.query;
        let coinValue = p3module.coinCount({denom: parseInt(denom), count: parseInt(count)});
        //console.log(typeof coinValue, coinValue);
        reply
            .header('Content-type', 'text/html; charset=utf-8')
            .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);
        reply.statusCode = 200;
        return coinValue;
});

// Add new GET route /coins:
    // Handle one query parameter,"option", no default value extracted from request.query and using object deconstruction
    // switch statement for the "option" values
    // return 0 if invalid option, statuscode(200), CT/MIME header, and template string literal
fastify.get("/coins", (request, reply) => {
    const coinCount = p3module.coinCount;
    const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
    //console.log(coinCount({denom:1, count:4}));
    //console.log(option);
    let coinValue;
    let { option } = request.query;
    switch(parseInt(option)) {
        case 1:
            coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 }); // option = 1
            break;
        case 2:
            coinValue = coinCount(...coins); // option = 2
            break;
        case 3:
            coinValue = coinCount(coins); // Extra credit: option = 3
            break;
        default:
            coinValue = 0;
            //option = 0;  no default option per instructions
    };
    reply
        .header('Content-type', 'text/html; charset=utf-8')
        .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
    reply.statusCode = 200;
    return coinValue;
}); 

// initiate constant variables for (port: 8080) and (IP: localhost)
const listenIP = "localhost";
const listenPort = 8080;

// support this file as a web server using listen(Port, IP, callback function). 
// log the IP and port to the console
fastify.listen(listenPort, listenIP, (err, address) => {
    if(err) {
        fastify.log.error(err);
        process.exit(1);
    }
    // console.log(`Server is listening on http://${listenIP}:${listenPort}/`);
    console.log(`IP: ${listenIP}, Port: ${listenPort}`);
});