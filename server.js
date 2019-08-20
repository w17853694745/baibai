//系统模块
const http=require("http");

//用户自定义模块
const config = require("./config/config");
const asyncFn = require("./async/async");

//第三方模块
const server  = http.createServer(asyncFn)
server.listen(config.port,config.host,()=>{
    console.log(`server is runing on http://${config.host}:${config.port}`);
})