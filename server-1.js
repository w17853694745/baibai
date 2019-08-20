const http=require("http");
const path = require("path");
const fs = require("fs");


const config = require("./config/config");

const jade = require("jade");

const server  = http.createServer((req,res)=>{
    //  url可能为http://127.0.0.1:8080/a/b/c.js?a=1&b=2
    //  serevrPath: /a/b/c.js
    //  absolutePath: node启动目录/a/b/c.js
    const url = req.url;
    const serevrPath = url.split("?")[0];
    const absolutePath = path.join(config.root,serevrPath);//绝对路径
    //以上成功的将 http://127.0.0.1:8080 映射成 node的启动目录

    fs.stat(absolutePath,(err,pathInfo)=>{
        if(pathInfo.isDirectory()){
            //absolutePath肯定是目录
            fs.readdir(absolutePath,(err,files)=>{
                let html = jade.renderFile(`${__dirname}/jade/index.jade`,{files});
                res.end(html);
                /*for(let file of files){
                    res.write(`<a href="javascript:;">${file}</a> <br/>`)
                }
                res.end();*/
            })
        }else if(pathInfo.isFile()){
            res.end();
        }else{
            res.end();
        }
    })
})
server.listen(config.port,config.host,()=>{
    console.log(`server is runing on http://${config.host}:${config.port}`);
})