var http = require('http'),
fs = require('fs');
function serveStaticFiles(res, path, contentType, responseCode){
    if(!responseCode) responseCode = 200;
    fs.readFile(path, function(err,data){
        if(err){
            res.writeHead(500,{'Content-Type' : 'text/plain'});
            res.end('500 - Internal error');
        }else{
            res.writeHead(responseCode,{'Content-Type': contentType});
            res.end(data);
        }
    });
}
http.createServer(function(req,res){
    var path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();
    switch(path){
        case '':
                serveStaticFiles(res,'index.html','text/html');
                console.log('HomePage');
                break;
        case '/about':
                serveStaticFiles(res,'about.html','text/html');
                console.log('About us');
                break;
        default:
                serveStaticFiles(res,'notfound.html','text/html',404);
                console.log('Not Found');
                break;
    }
}).listen(3000);
console.log('Serve started on Port 3000, Press ctrl+c to terminate...');
