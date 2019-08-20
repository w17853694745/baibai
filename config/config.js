module.exports={
    port:12306,
    host:"127.0.0.1",
    //当前目录应该是我们静态资源服务器的根目录(node的启动目录)
	//访问http://127.0.0.1:12306就相当于在电脑里打开root 电脑里是没有http://127.0.0.1
    root:process.cwd()
}