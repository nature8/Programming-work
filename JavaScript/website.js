const http = require('http');
const port = process.env.PORT || 3000;
const server = http.createServer((req, res)=>{
    //res.statusCode = 200;
    res.setHeader('Content-Type','text/html')
    console.log(req.url)
    if(req.url == '/'){
        res.statusCode = 200;
        res.end('<h1>This is Prakruti here!!</h1>');
    }
    else if(req.url == '/about'){
        res.statusCode = 200;
        res.end('<h1>About Prakruti!!</h1>');
    }
    else{
        res.statusCode = 404;
        res.end('<h1>The end, page not found!!<\h1>');
    }
})

server.listen(port, ()=>{
    console.log(`Server is listening on the port ${port}`);
});