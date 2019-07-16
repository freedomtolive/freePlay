/**
 * ls
 *  输出当前运行命令所在的目录下的文件和文件夹
 * ls -p d:\
 *  我们还可以指定要显示的目录
 */

//  加载commander模块
const commander = require("commander");

// 设置当前命令的版本
commander.version("1.0.0","-v, --version");

// 添加文件夹模块
const fs = require("fs");

// 添加子命令


// 实现命令的具体逻辑
commander.action(() => {
    try{
        // 读取文件夹
        const files = fs.readdirSync( __dirname );
        console.log(files);
    }
    catch(e){
        console.log(e);
    }
})






// 输出
commander.parse( process.argv );