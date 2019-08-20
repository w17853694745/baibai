const path = require("path");
const fs = require("fs");
const config = require("../config/config");
const jade = require("jade");
const {promisify} = require("util");

// 1. 不会再有回调地狱了!!!   2.数据的获取会简洁很多
const statP = promisify(fs.stat);
const readdirP = promisify(fs.readdir);

module.exports = async (req,res)=>{
    const url = req.url;
    const serevrPath = url.split("?")[0];
    const absolutePath = path.join(config.root,serevrPath);
    //后台路由(接口)是用来吐数据的!!!!!
    //如果serevrPath中的路径是不带后缀的!!  一般这就是应该接口 该访问数据库 吐数据
    //如果serevrPath中的路径是带后缀的   这只是一个简单的静态资源的访问!!!
    console.log(serevrPath);
    const  pathInfo = await statP(absolutePath);
    if(pathInfo.isDirectory()){
        const files = await readdirP(absolutePath);
        let obj = {
            files,
            dir:serevrPath === "/"?"":serevrPath
        }
        let html = jade.renderFile(`${__dirname}/../jade/index.jade`,obj);
        res.end(html);
    }else if(pathInfo.isFile()){
        let fileFs =  fs.createReadStream(absolutePath);
        fileFs.pipe(res);
    }else{
        res.end();
    }
}